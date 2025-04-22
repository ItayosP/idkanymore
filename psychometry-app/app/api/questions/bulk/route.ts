import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { questions } = body;

    // Validate the questions array
    if (!Array.isArray(questions)) {
      return NextResponse.json(
        { error: 'Invalid format: questions must be an array' },
        { status: 400 }
      );
    }

    // Process each question
    const processedQuestions = questions.map(question => {
      // Find the index of the correct answer
      const correctAnswerIndex = question.options.indexOf(question.correctAnswer);
      if (correctAnswerIndex === -1) {
        throw new Error(`Correct answer "${question.correctAnswer}" not found in options`);
      }

      // Convert difficulty to integer
      const difficultyMap: Record<string, number> = {
        'easy': 1,
        'medium': 2,
        'hard': 3,
        'very_hard': 4
      };

      const difficultyLevel = difficultyMap[question.difficulty];
      if (!difficultyLevel) {
        throw new Error(`Invalid difficulty level: ${question.difficulty}`);
      }

      return {
        content: question.content,
        options: JSON.stringify(question.options),
        correctAnswer: correctAnswerIndex,
        section: question.section,
        difficulty: difficultyLevel
      };
    });

    // Create all questions in a transaction
    const createdQuestions = await prisma.$transaction(
      processedQuestions.map(question => 
        prisma.question.create({ data: question })
      )
    );

    return NextResponse.json({
      message: `Successfully imported ${createdQuestions.length} questions`,
      questions: createdQuestions
    });
  } catch (error) {
    console.error('Error importing questions:', error);
    return NextResponse.json(
      { error: 'Failed to import questions', details: error.message },
      { status: 500 }
    );
  }
} 