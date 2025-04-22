import { PrismaClient } from '@prisma/client';
import prisma from '@/lib/prisma';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import questionsData from '@/docs/questions-import-template.json';

async function getQuestionDetails(questionId: string) {
  // Check if it's a database question
  if (questionId.startsWith('db-')) {
    const dbId = questionId.substring(3);
    const dbQuestion = await prisma.question.findUnique({
      where: { id: dbId }
    });

    if (dbQuestion) {
      return {
        id: dbQuestion.id,
        content: dbQuestion.content,
        options: JSON.parse(dbQuestion.options),
        correctAnswer: dbQuestion.correctAnswer,
        section: dbQuestion.section,
        difficulty: dbQuestion.difficulty
      };
    }
  }

  // Check if it's a JSON question
  if (questionId.startsWith('json-')) {
    const jsonId = questionId.substring(5);
    const jsonQuestion = questionsData.questions.find(q => 
      q.content.substring(0, 20).replace(/\s+/g, '-') === jsonId
    );

    if (jsonQuestion) {
      return {
        id: jsonQuestion.id,
        content: jsonQuestion.content,
        options: jsonQuestion.options,
        correctAnswer: jsonQuestion.correctAnswer,
        section: jsonQuestion.section,
        difficulty: jsonQuestion.difficulty
      };
    }
  }

  return null;
}

export default async function TestResults({ params }: { params: { attemptId: string } }) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user || !session.user.id) {
    return <div>Unauthorized</div>;
  }

  const attempt = await prisma.testAttempt.findUnique({
    where: { id: params.attemptId }
  });

  if (!attempt) {
    return <div>Test attempt not found</div>;
  }

  const answers = JSON.parse(attempt.answers);
  const questions = await Promise.all(
    answers.map(async (answer: any) => {
      const question = await getQuestionDetails(answer.questionId);
      return {
        ...question,
        userAnswer: answer.answer,
        isCorrect: question?.correctAnswer === answer.answer
      };
    })
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">תוצאות המבחן</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">סיכום</h2>
          <p>ציון: {attempt.score}</p>
          <p>סעיף: {attempt.section}</p>
          <p>תאריך: {new Date(attempt.completedAt).toLocaleDateString('he-IL')}</p>
        </div>
        
        <div className="space-y-6">
          {questions.map((question, index) => (
            <div key={index} className="border rounded-lg p-4">
              <p className="font-semibold mb-2">{question?.content || 'שאלה לא נמצאה'}</p>
              <div className="space-y-2">
                {question?.options?.map((option: string, i: number) => (
                  <div
                    key={i}
                    className={`p-2 rounded ${
                      option === question.correctAnswer
                        ? 'bg-green-100'
                        : option === question.userAnswer
                        ? 'bg-red-100'
                        : 'bg-gray-50'
                    }`}
                  >
                    {option}
                  </div>
                ))}
              </div>
              <p className="mt-2 text-sm text-gray-600">
                תשובתך: {question?.userAnswer || 'לא ענית'}
                {question?.isCorrect ? ' ✓' : ' ✗'}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 