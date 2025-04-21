'use client';

import React, { useState, useEffect } from 'react';

// Define expected Question structure (adjust based on actual data)
interface Question {
  id: string;
  text: string;         // The question text itself
  passage?: string;      // Optional passage for reading comprehension
  options: string[];    // Array of answer options
  // correctAnswerIndex?: number; // Might be fetched separately or omitted on client
}

interface TestSectionProps {
  sectionType: 'verbal' | 'quantitative' | 'english' | 'pilot'; // Include pilot type
  questions: Question[]; // Array of questions for this section
  duration: number;      // Duration in seconds
  onComplete: (answers: { [questionId: string]: number }) => void; // Callback with user answers
  isPilot: boolean;      // Flag to indicate if this is a pilot section
}

const TestSection: React.FC<TestSectionProps> = ({ 
  sectionType, 
  questions, 
  duration, 
  onComplete, 
  isPilot 
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [questionId: string]: number }>({});
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isRunning, setIsRunning] = useState(true);

  // Timer Logic (similar to EssayTask)
  useEffect(() => {
    if (!isRunning || timeLeft <= 0) return;
    const timerInterval = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);
    return () => clearInterval(timerInterval);
  }, [isRunning, timeLeft]);

  useEffect(() => {
    if (timeLeft === 0) {
      setIsRunning(false);
      console.log(`Time up for section: ${sectionType}`);
      handleSectionComplete(); // Auto-complete when time runs out
    }
  }, [timeLeft]);

  const handleAnswerSelect = (questionId: string, answerIndex: number) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: answerIndex,
    }));
    // Optional: Auto-advance to next question
    // if (currentQuestionIndex < questions.length - 1) {
    //   setCurrentQuestionIndex(currentQuestionIndex + 1);
    // }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSectionComplete = () => {
    setIsRunning(false);
    console.log(`Section ${sectionType} completed manually. Answers:`, answers);
    onComplete(answers); // Pass answers back to parent
  };

  // Format time left as MM:SS
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getSectionDisplayName = () => {
    switch (sectionType) {
      case 'verbal': return 'חשיבה מילולית';
      case 'quantitative': return 'חשיבה כמותית';
      case 'english': return 'אנגלית';
      case 'pilot': return 'פרק פיילוט';
      default: return 'פרק לא ידוע';
    }
  };
  
  // Placeholder for loading or error states
  if (!questions || questions.length === 0) {
      return <div>Loading questions or no questions available...</div>; // TODO: Improve this state
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div dir="rtl" className="space-y-6 p-4 md:p-6 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 shadow-md">
      <div className="flex justify-between items-center border-b dark:border-gray-700 pb-3 mb-4">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
          {getSectionDisplayName()} {isPilot ? '(פיילוט)' : ''} - שאלה {currentQuestionIndex + 1} מתוך {questions.length}
        </h2>
        <div className="text-lg font-semibold tabular-nums" style={{ color: timeLeft < 60 ? 'red' : 'inherit' }}>
          זמן נותר: {formatTime(timeLeft)}
        </div>
      </div>

      {/* Display Passage if exists (for Reading Comprehension) */}
      {currentQuestion.passage && (
        <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-md">
          <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-line">
            {currentQuestion.passage}
          </p>
        </div>
      )}

      {/* Question Text */}
      <div className="mb-4">
        <p className="text-md font-medium text-gray-900 dark:text-white whitespace-pre-line">
          {currentQuestion.text}
        </p>
      </div>

      {/* Answer Options */}
      <div className="space-y-3">
        {currentQuestion.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswerSelect(currentQuestion.id, index)}
            className={`w-full text-right p-3 border rounded-lg transition duration-150 ease-in-out 
              ${answers[currentQuestion.id] === index 
                ? 'bg-blue-100 dark:bg-blue-900 border-blue-500 ring-2 ring-blue-300 dark:ring-blue-700' 
                : 'bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600'}
            `}
            disabled={timeLeft <= 0}
          >
            <span className="font-mono mr-2">({index + 1})</span> {option}
          </button>
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center pt-4 mt-4 border-t dark:border-gray-700">
        <button
          onClick={handlePrevQuestion}
          disabled={currentQuestionIndex === 0 || timeLeft <= 0}
          className="px-4 py-2 bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-800 dark:text-white font-medium rounded-lg shadow-sm transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
        >
          שאלה קודמת
        </button>
        
        {currentQuestionIndex === questions.length - 1 ? (
           <button
             onClick={handleSectionComplete}
             disabled={timeLeft <= 0}
             className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg shadow-sm transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
           >
             סיים פרק
           </button>
        ) : (
          <button
            onClick={handleNextQuestion}
            disabled={currentQuestionIndex === questions.length - 1 || timeLeft <= 0}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
          >
            שאלה הבאה
          </button>
        )}
      </div>
      
      {timeLeft <= 0 && (
        <p className="text-red-600 dark:text-red-400 font-semibold text-center mt-2">הזמן לפרק זה הסתיים!</p>
      )}
    </div>
  );
};

export default TestSection; 