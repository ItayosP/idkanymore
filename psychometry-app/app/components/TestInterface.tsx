'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Question } from '@prisma/client'; // Corrected import path for Prisma types
import WritingTaskInterface from './WritingTaskInterface'; // Import the WritingTaskInterface

interface TestInterfaceProps {
  section: 'verbal' | 'quantitative' | 'english' | 'hebrew';
  subcategory?: string;
  isFullTest?: boolean;
}

// --- Helper Functions ---
const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
};

export default function TestInterface({ section, subcategory, isFullTest = false }: TestInterfaceProps) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<(number | null)[]>([]);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [timeSpent, setTimeSpent] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [sectionDuration, setSectionDuration] = useState<number | null>(null);
  const [isTestComplete, setIsTestComplete] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [finalScore, setFinalScore] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [testPhase, setTestPhase] = useState<'options' | 'writing' | 'questions' | 'complete'>('options');
  const router = useRouter();

  const currentQuestion = questions[currentQuestionIndex];
  const isAnswerSelected = selectedAnswer !== null;

  const fetchQuestions = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      let url = '/api/questions';
      const params = new URLSearchParams();
      if (section) params.append('type', section);
      if (subcategory) params.append('subcategory', subcategory);
      if (isFullTest) params.append('fullTest', 'true');

      const queryString = params.toString();
      if (queryString) {
        url += `?${queryString}`;
      }
      
      console.log("Fetching questions from:", url);

      const response = await fetch(url);
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Failed to fetch questions:', response.status, errorText);
        throw new Error(`Failed to fetch questions: ${response.statusText}`);
      }
      const data = await response.json();
      console.log("Fetched questions:", data);
      if (data && data.length > 0) {
        setQuestions(data);
        setUserAnswers(new Array(data.length).fill(null));
      } else {
        setQuestions([]);
        setUserAnswers([]);
        console.log("No questions found for this section/subcategory.");
      }
    } catch (err) {
      console.error("Error fetching questions:", err);
      setError(err instanceof Error ? err.message : 'שגיאה לא ידועה בטעינת השאלות');
    } finally {
      setLoading(false);
    }
  }, [section, subcategory, isFullTest]);

  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  useEffect(() => {
    if (questions.length > 0) {
      setUserAnswers(new Array(questions.length).fill(null));
      setStartTime(Date.now());
    }
  }, [questions]);

  // Add keyboard navigation effect
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!currentQuestion) return;

      // Handle number keys 1-4 for answer selection
      if (['1', '2', '3', '4'].includes(event.key)) {
        const answerIndex = parseInt(event.key, 10) - 1;
        if (answerIndex >= 0 && answerIndex < currentQuestion.options.length) {
          handleAnswerSelect(answerIndex);
        }
      }

      // Handle Enter key for next/finish
      if (event.key === 'Enter') {
        // Only proceed if an answer is selected for the current question
        if (isAnswerSelected) {
          if (currentQuestionIndex === questions.length - 1) {
            handleFinishTest();
          } else {
            handleNextQuestion();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [currentQuestion, currentQuestionIndex, questions.length, isAnswerSelected]);

  const handleAnswerSelect = (index: number) => {
    setSelectedAnswer(index);
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = index;
    setUserAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedAnswer(userAnswers[currentQuestionIndex - 1]);
    }
  };

  const handleFinishTest = async () => {
    if (selectedAnswer === null) return;
    
    const endTime = Date.now();
    const totalTimeSpent = Math.floor((endTime - startTime) / 1000);
    
    const testResult = {
      testType: section,
      sections: [{
        type: section,
        isPilot: false,
        answers: questions.map((question, index) => ({
          questionId: question.id.toString(),
          selectedAnswer: userAnswers[index],
          isCorrect: userAnswers[index] === question.correctAnswer,
          timeSpent: Math.floor(totalTimeSpent / questions.length)
        }))
      }],
      overallTimeSpent: totalTimeSpent
    };

    try {
      const response = await fetch('/api/test/complete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(testResult),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.attemptId) {
          router.push(`/results/${data.attemptId}`);
        }
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12">
        <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600 dark:text-gray-300">טוען שאלות...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12">
        <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <div className="text-center">
              <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
              <button
                onClick={fetchQuestions}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
              >
                נסה שוב
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12">
        <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <div className="text-center">
              <p className="text-gray-600 dark:text-gray-300 mb-4">לא נמצאו שאלות</p>
              <button
                onClick={() => router.push('/')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
              >
                חזרה לדף הבית
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isTestComplete || testPhase === 'complete') {
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <h2 className="text-2xl font-bold text-center mb-6">מבחן הושלם!</h2>

            {finalScore !== null ? (
              <div className="bg-gray-700 p-6 rounded-lg shadow-md text-center mb-6">
                <p className="text-lg font-semibold text-gray-300 mb-2">הציון שלך:</p>
                <p className="text-4xl font-bold text-white">{finalScore}</p>
              </div>
            ) : (
              <p className="text-center text-gray-400 mb-6">טוען ציון...</p>
            )}

            {!isFullTest && (
              <div className="bg-gray-800 p-6 rounded-lg shadow-md mb-6">
                <h3 className="text-xl font-semibold text-white mb-4">סיכום תשובות:</h3>
                <ul className="space-y-3 max-h-60 overflow-y-auto">
                  {userAnswers.map((answer, index) => {
                    const question = questions.find(q => q.id === index + 1);
                    return (
                      <li key={index} className={`p-3 rounded ${answer === question?.correctAnswer ? 'bg-green-900' : 'bg-red-900'}`}>
                        <p className="font-semibold">שאלה {index + 1}:</p>
                        <p>תשובה שנבחרה: {question?.options[answer]}</p>
                        <p>תשובה נכונה: {question?.options[question.correctAnswer]}</p>
                        <p>זמן: {formatTime(Math.floor(timeSpent / questions.length))}</p>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}

            <div className="flex justify-center space-x-4">
              <Link href="/dashboard" passHref>
                <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition duration-200">
                  חזור לדשבורד
                </button>
              </Link>
              <Link href={isFullTest ? '/full' : `/tests/${section}`} passHref>
                <button className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg shadow-md transition duration-200">
                  נסה שוב
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12">
      <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              {section === 'verbal' ? (
                subcategory === 'sentence-completion' ? 'השלמת משפטים' :
                subcategory === 'analogies' ? 'אנלוגיות' :
                subcategory === 'comprehension' ? 'הבנה והסקה' :
                subcategory === 'reading' ? 'הבנת הנקרא' :
                'חשיבה מילולית'
              ) : section === 'quantitative' ? (
                subcategory === 'problems' ? 'שאלות ובעיות' :
                'חשיבה כמותית'
              ) : (
                subcategory === 'reading' ? 'Reading Comprehension' :
                subcategory === 'restatements' ? 'Restatements' :
                subcategory === 'sentence-completion' ? 'Sentence Completion' :
                'English'
              )}
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
              שאלה {currentQuestionIndex + 1} מתוך {questions.length}
            </p>
          </div>

          <div className="mb-6">
            <p className="text-lg text-gray-900 dark:text-white mb-4">
              {currentQuestion.text}
            </p>
          </div>

          <div className="space-y-4 mb-6">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`w-full text-right p-4 rounded-lg border-2 transition-colors duration-200 ${
                  selectedAnswer === index
                    ? 'border-blue-600 bg-blue-100 text-blue-900 font-bold'
                    : 'border-gray-300 bg-white dark:bg-gray-700 hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200'
                }`}
              >
                <span className="font-mono mr-2">({index + 1})</span> {option}
              </button>
            ))}
          </div>

          <div className="flex justify-end">
            {currentQuestionIndex === questions.length - 1 ? (
              <button
                onClick={handleFinishTest}
                disabled={selectedAnswer === null}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg disabled:opacity-50"
              >
                סיים מבחן
              </button>
            ) : (
              <button
                onClick={handleNextQuestion}
                disabled={selectedAnswer === null}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg disabled:opacity-50"
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