'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Question } from '@/types'; // Assuming Question type is defined

// Define interfaces for the expected data structure
interface DetailedAnswer {
  questionId: string;
  selectedAnswer: number | null;
  isCorrect: boolean;
  timeSpent: number;
  question: Question | null; // Full question details
}

interface TestAttemptResult {
  id: string;
  userId: string;
  section: string;
  score: number;
  timeSpent: number;
  completedAt: string;
  detailedAnswers: DetailedAnswer[];
}

function ResultsDisplay() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const attemptId = searchParams.get('attemptId');
  const [result, setResult] = useState<TestAttemptResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!attemptId) {
      setError('לא נמצא מזהה מבחן.');
      setLoading(false);
      // Maybe redirect back or show a specific message
      // router.push('/'); 
      return;
    }

    const fetchResult = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/test/results/${attemptId}`);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
        }
        const data: TestAttemptResult = await response.json();
        // Basic validation of received data
        if (!data || !data.detailedAnswers) {
          throw new Error('פורמט תוצאות לא תקין מהשרת.');
        }
        setResult(data);
      } catch (err) {
        console.error("Error fetching results:", err);
        setError(err instanceof Error ? err.message : 'שגיאה בטעינת התוצאות.');
      } finally {
        setLoading(false);
      }
    };

    fetchResult();
  }, [attemptId, router]);

  const getSectionName = (section: string) => {
    switch (section) {
      case 'verbal': return 'חשיבה מילולית';
      case 'quantitative': return 'חשיבה כמותית';
      case 'english': return 'אנגלית';
      default: return section;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <p className="ml-4 text-gray-600 dark:text-gray-300">טוען תוצאות...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">
          שגיאה בטעינת התוצאות
        </h1>
        <p className="text-gray-700 dark:text-gray-300 mb-6">{error}</p>
        <Link
          href="/"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
        >
          חזרה לדף הבית
        </Link>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          לא נמצאו תוצאות עבור מבחן זה.
        </h1>
        <Link
          href="/"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
        >
          חזרה לדף הבית
        </Link>
      </div>
    );
  }

  // Calculate accuracy
  const correctCount = result.detailedAnswers.filter(a => a.isCorrect).length;
  const totalQuestions = result.detailedAnswers.length;
  const accuracy = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-6 sm:p-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            תוצאות המבחן - {getSectionName(result.section)}
          </h1>

          {/* Score and Accuracy Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="text-center">
              <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">ציון סופי</h2>
              <p className="text-4xl font-bold text-blue-600 dark:text-blue-400">{Math.round(result.score)}%</p>
            </div>
            <div className="text-center">
              <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">דיוק</h2>
              <p className="text-4xl font-bold text-green-600 dark:text-green-400">{accuracy}%</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">({correctCount} מתוך {totalQuestions} תשובות נכונות)</p>
            </div>
          </div>

          {/* Detailed Answers Section */}
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 border-b pb-2 dark:border-gray-700">
            פירוט תשובות
          </h2>
          <div className="space-y-6">
            {result.detailedAnswers.map((answer, index) => (
              <div
                key={answer.questionId || index} // Use questionId if available
                className="border dark:border-gray-700 rounded-lg shadow-sm overflow-hidden"
              >
                <div className={`p-4 ${answer.isCorrect ? 'bg-green-50 dark:bg-green-900/30' : 'bg-red-50 dark:bg-red-900/30'}`}>
                  <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-100 mb-3">
                    שאלה {index + 1}
                    <span className={`ml-3 text-sm font-bold ${answer.isCorrect ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                      ({answer.isCorrect ? 'תשובה נכונה' : 'תשובה שגויה'})
                    </span>
                  </h3>
                  {answer.question ? (
                    <p className="text-gray-700 dark:text-gray-300 mb-4">{answer.question.text}</p>
                  ) : (
                    <p className="text-gray-500 dark:text-gray-400 mb-4 italic">טקסט השאלה לא זמין.</p>
                  )}
                </div>

                <div className="p-4 bg-white dark:bg-gray-800/50 space-y-3">
                  <div>
                    <span className="font-medium text-gray-700 dark:text-gray-300">התשובה שלך:</span>
                    <span className={`ml-2 ${!answer.isCorrect ? 'text-red-700 dark:text-red-400 font-semibold' : 'text-gray-600 dark:text-gray-400'}`}>
                      {answer.selectedAnswer !== null && answer.question ? 
                       answer.question.options[answer.selectedAnswer] : 'לא נענתה'}
                    </span>
                  </div>
                  
                  {!answer.isCorrect && answer.question && (
                     <div>
                      <span className="font-medium text-gray-700 dark:text-gray-300">התשובה הנכונה:</span>
                      <span className="ml-2 text-green-700 dark:text-green-400 font-semibold">
                         {answer.question.options[answer.question.correctAnswer]}
                      </span>
                    </div>
                  )}

                  {answer.question?.explanation && (
                    <div className="pt-3 mt-3 border-t dark:border-gray-700">
                      <span className="font-medium text-gray-700 dark:text-gray-300">הסבר:</span>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                         {answer.question.explanation}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="mt-10 pt-6 border-t dark:border-gray-700 flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/dashboard" // Link to dashboard or relevant overview page
              className="w-full sm:w-auto text-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition duration-200"
            >
              חזרה ללוח הבקרה
            </Link>
            {/* Optional: Add a button to retry the same section? */}
            {/* <Link
              href={`/tests/${result.section}`}
              className="w-full sm:w-auto text-center bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg transition duration-200"
            >
              נסה שוב את המקטע
            </Link> */}
          </div>
        </div>
      </div>
    </div>
  );
}

// Wrap the component in Suspense for useSearchParams
export default function ResultsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
         <p className="ml-4 text-gray-600 dark:text-gray-300">טוען...</p>
      </div>
    }>
      <ResultsDisplay />
    </Suspense>
  );
} 