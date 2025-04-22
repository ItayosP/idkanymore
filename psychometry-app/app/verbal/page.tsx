'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface Answer {
  questionId: number;
  selectedAnswer: number;
  isCorrect: boolean;
}

export default function VerbalTest() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [testCompleted, setTestCompleted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    console.log('VerbalTest: Component mounted, fetching questions');
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      console.log('VerbalTest: Starting to fetch questions');
      const response = await fetch('/api/questions?type=verbal');
      console.log('VerbalTest: Received response:', response.status);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch questions: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('VerbalTest: Parsed response data:', data);
      
      if (!Array.isArray(data) || data.length === 0) {
        throw new Error('No questions received from the server');
      }
      
      setQuestions(data);
      setLoading(false);
    } catch (err) {
      console.error('VerbalTest: Error fetching questions:', err);
      setError('שגיאה בטעינת השאלות. אנא נסה שוב מאוחר יותר.');
      setLoading(false);
    }
  };

  const handleAnswerSelect = (index: number) => {
    console.log('VerbalTest: Answer selected:', index);
    setSelectedAnswer(index);
    setShowExplanation(true);

    // Save the answer
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = index === currentQuestion.correctAnswer;
    setAnswers(prev => [...prev, {
      questionId: currentQuestion.id,
      selectedAnswer: index,
      isCorrect
    }]);
  };

  const handleNextQuestion = () => {
    console.log('VerbalTest: Moving to next question');
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  };

  const handlePreviousQuestion = () => {
    console.log('VerbalTest: Moving to previous question');
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  };

  const handleFinishTest = () => {
    setTestCompleted(true);
  };

  const handleSubmit = async () => {
    if (answers.length !== questions.length) {
      setError('אנא ענה על כל השאלות');
      return;
    }

    setIsSubmitting(true);
    try {
      const testResult = {
        testType: 'verbal',
        sections: [{
          type: 'verbal',
          isPilot: false,
          answers: answers.map(answerInState => {
            console.log(`Mapping answer for QID ${answerInState.questionId}: selectedAnswer=${answerInState.selectedAnswer} (Type: ${typeof answerInState.selectedAnswer})`);
            return {
              questionId: answerInState.questionId.toString(),
              selectedAnswer: answerInState.selectedAnswer,
              timeSpent: 0
            };
          })
        }],
        overallTimeSpent: 0
      };
      
      console.log('Submitting Test Result Payload:', JSON.stringify(testResult, null, 2));

      // Save test attempt
      const response = await fetch('/api/test/complete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(testResult),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'שגיאה בשמירת התוצאות');
      }

      const data = await response.json();
      setScore(calculateScore(answers));
      setShowResults(true);
      setError('');
    } catch (err) {
      console.error('Error submitting test:', err);
      setError(err instanceof Error ? err.message : 'שגיאה בשמירת התוצאות');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helper function to calculate score
  const calculateScore = (answers: any[]): number => {
    const correctAnswers = answers.filter(answer => answer.isCorrect).length;
    return (correctAnswers / questions.length) * 100;
  };

  if (loading) {
    console.log('VerbalTest: Rendering loading state');
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">טוען שאלות...</p>
        </div>
      </div>
    );
  }

  if (error) {
    console.log('VerbalTest: Rendering error state:', error);
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={fetchQuestions}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            נסה שוב
          </button>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    console.log('VerbalTest: No questions available');
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">לא נמצאו שאלות</p>
          <button
            onClick={() => router.push('/')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            חזרה לדף הבית
          </button>
        </div>
      </div>
    );
  }

  if (showResults) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">תוצאות המבחן</h2>
            
            <div className="text-center mb-8">
              <div className="text-4xl font-bold text-blue-600 mb-2">{score}%</div>
            </div>

            <div className="space-y-4">
              {questions.map((question, index) => {
                const answer = answers.find(a => a.questionId === question.id);
                return (
                  <div key={question.id} className="border rounded-lg p-4">
                    <div className="font-semibold mb-2">שאלה {index + 1}:</div>
                    <div className="mb-2">{question.text}</div>
                    <div className={`mb-2 ${answer?.isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                      תשובתך: {question.options[answer?.selectedAnswer || 0]}
                    </div>
                    <div className="text-green-600 mb-2">
                      התשובה הנכונה: {question.options[question.correctAnswer]}
                    </div>
                    <div className="text-gray-600 text-sm">
                      הסבר: {question.explanation}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 text-center">
              <button
                onClick={() => router.push('/')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
              >
                חזרה לדף הבית
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  console.log('VerbalTest: Rendering question:', currentQuestionIndex + 1, 'of', questions.length);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12">
      <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              שאלה {currentQuestionIndex + 1} מתוך {questions.length}
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">{currentQuestion.text}</p>
          </div>

          <div className="space-y-4 mb-6">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                disabled={showExplanation}
                className={`w-full text-right p-4 rounded-lg border-2 transition-colors duration-200 ${
                  selectedAnswer === index
                    ? showExplanation
                      ? index === currentQuestion.correctAnswer
                        ? 'border-green-600 bg-green-100 text-green-900 font-bold'
                        : 'border-red-600 bg-red-100 text-red-900 font-bold'
                      : 'border-blue-600 bg-blue-100 text-blue-900 font-bold'
                    : 'border-gray-300 bg-white dark:bg-gray-700 hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200'
                }`}
              >
                {option}
              </button>
            ))}
          </div>

          {showExplanation && (
            <div className="mb-6 p-4 bg-gray-100 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">הסבר:</h3>
              <p className="text-gray-700">{currentQuestion.explanation}</p>
            </div>
          )}

          <div className="flex justify-between">
            <button
              onClick={handlePreviousQuestion}
              disabled={currentQuestionIndex === 0}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg disabled:opacity-50"
            >
              שאלה קודמת
            </button>
            {currentQuestionIndex === questions.length - 1 ? (
              <button
                onClick={handleSubmit}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg"
              >
                סיים מבחן
              </button>
            ) : (
              <button
                onClick={handleNextQuestion}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
              >
                שאלה הבאה
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 