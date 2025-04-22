const { PrismaClient } = require('@prisma/client');
const questionsData = require('../docs/questions-import-template.json');

const prisma = new PrismaClient();

// Helper function to convert difficulty string to number
function getDifficultyNumber(difficulty: string): number {
  switch (difficulty.toLowerCase()) {
    case 'easy':
      return 1;
    case 'medium':
      return 2;
    case 'hard':
      return 3;
    case 'very hard':
      return 4;
    default:
      return 1; // default to easy
  }
}

async function importQuestions() {
  try {
    console.log('Starting question import...');
    
    for (const question of questionsData.questions) {
      // Find the index of the correct answer in the options array
      const correctAnswerIndex = question.options.indexOf(question.correctAnswer);
      
      await prisma.question.create({
        data: {
          content: question.content,
          options: JSON.stringify(question.options),
          correctAnswer: correctAnswerIndex, // Store the index as a number
          section: question.section,
          difficulty: getDifficultyNumber(question.difficulty), // Convert to number
          createdAt: new Date(),
          updatedAt: new Date()
        }
      });
      console.log(`Imported question: ${question.content.substring(0, 50)}...`);
    }
    
    console.log('Question import completed successfully!');
  } catch (error) {
    console.error('Error importing questions:', error);
  } finally {
    await prisma.$disconnect();
  }
}

importQuestions(); 