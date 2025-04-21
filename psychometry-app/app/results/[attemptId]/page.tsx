'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

// Define types for the fetched data (adjust based on actual API response)
interface AnswerDetail {
  questionId: string;
  questionText: string; // Assuming API provides question text
  options: string[];     // Assuming API provides options
  selectedAnswerIndex: number;
  correctAnswerIndex: number;
  isCorrect: boolean;
  // Add passage if needed for context
}

interface SectionResult {
  sectionType: string; // e.g., 'verbal', 'quantitative', 'english', 'pilot', 'essay'
  isPilot: boolean;
  score?: number; // Score might not apply to essay or pilots
  answers?: AnswerDetail[]; // Only for MC sections
  essayContent?: string; // Only for essay section
}

interface TestAttemptResult {
  id: string;
  completedAt: string;
  overallScore?: number; // May need calculation or backend support
  sections: SectionResult[];
}

export default function ResultsPage() {
  const params = useParams();
  const attemptId = params.attemptId as string;
  const [resultData, setResultData] = useState<TestAttemptResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<number>(0); // For tabbed display

  useEffect(() => {
    if (!attemptId) return;

    const fetchResults = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/test/results/${attemptId}`);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
        }
        const data: TestAttemptResult = await response.json();
        
        // TODO: Process/transform data if needed (e.g., parse JSON answers)
        // Example if API returns raw answers string:
        // data.sections.forEach(section => {
        //   if (section.answers && typeof section.answers === 'string') {
        //     section.answers = JSON.parse(section.answers);
        //   }
        // });

        setResultData(data);
      } catch (err) {
        console.error("Error fetching results:", err);
        setError(err instanceof Error ? err.message : 'שגיאה בטעינת תוצאות המבחן.');
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [attemptId]);

  // --- Helper Functions ---
  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleString('he-IL', {
        dateStyle: 'short', timeStyle: 'short'
      });
    } catch { return 'תאריך לא ידוע'; }
  };

  const getSectionDisplayName = (section: SectionResult) => {
    // Basic naming, might need refinement for multiple sections of same type (Verbal 1, Verbal 2)
    switch (section.sectionType) {
      case 'verbal': return 'חשיבה מילולית';
      case 'quantitative': return 'חשיבה כמותית';
      case 'english': return 'אנגלית';
      case 'essay': return 'מטלת כתיבה';
      case 'pilot': return 'פרק פיילוט'; 
      default: return section.sectionType;
    }
  };
  // ------------------------

  // --- Render States ---
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
        <h1 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">שגיאה בטעינת תוצאות</h1>
        <p className="text-gray-700 dark:text-gray-300 mb-6">{error}</p>
        <Link href="/dashboard" className="text-blue-500 hover:underline">חזרה ללוח הבקרה</Link>
      </div>
    );
  }

  if (!resultData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600 dark:text-gray-300">לא נמצאו נתוני תוצאות עבור מבחן זה.</p>
      </div>
    );
  }
  // ----------------------

  return (
    <div dir="rtl" className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto bg-white dark:bg-gray-800 shadow-xl rounded-lg p-6 sm:p-8">
        
        {/* Header */}
        <div className="mb-8 pb-4 border-b dark:border-gray-700">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            תוצאות מבחן מלא
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            הושלם בתאריך: {formatDate(resultData.completedAt)}
          </p>
          {/* TODO: Display overall score if calculated/available */}
          {/* {resultData.overallScore && (
            <p className="text-xl font-semibold text-blue-600 dark:text-blue-400 mt-2">
              ציון כללי: {Math.round(resultData.overallScore)}
            </p>
          )} */} 
        </div>

        {/* Tabs for Sections */}
        <div className="mb-6 border-b border-gray-200 dark:border-gray-700">
          <nav className="-mb-px flex space-x-4 space-x-reverse overflow-x-auto" aria-label="Tabs">
            {resultData.sections.map((section, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm 
                  ${activeTab === index
                    ? 'border-blue-500 text-blue-600 dark:border-blue-400 dark:text-blue-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:border-gray-600'}
                `}
              >
                {/* TODO: Improve naming (e.g., Verbal 1, Verbal 2) */}
                {getSectionDisplayName(section)} {section.isPilot ? '(פיילוט)' : ''} 
                {section.score !== undefined && !section.isPilot && `(${Math.round(section.score)}%)`}
              </button>
            ))}
          </nav>
        </div>

        {/* Content for Active Tab */}
        <div>
          {resultData.sections.map((section, index) => (
            <div key={index} className={activeTab === index ? 'block' : 'hidden'}>
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
                {getSectionDisplayName(section)} {section.isPilot ? '(פיילוט)' : ''}
                {section.score !== undefined && !section.isPilot && (
                  <span className="text-lg font-medium text-blue-600 dark:text-blue-400 ml-4">
                    (ציון: {Math.round(section.score)}%)
                  </span>
                )}
                 {section.isPilot && (
                  <span className="text-base font-normal text-gray-500 dark:text-gray-400 ml-4">
                    (לא משוקלל בציון)
                  </span>
                )}
              </h2>
              
              {/* Display Essay Content */}
              {section.sectionType === 'essay' && section.essayContent && (
                <div className="p-4 border rounded-md bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                  <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">החיבור שהוגש:</h3>
                  <p className="text-gray-800 dark:text-gray-200 whitespace-pre-line">
                    {section.essayContent}
                  </p>
                </div>
              )}

              {/* Display MC Answers */}
              {section.answers && section.answers.length > 0 && (
                <ul className="space-y-4">
                  {section.answers.map((answer, qIndex) => (
                    <li key={answer.questionId} className="p-4 border rounded-md bg-gray-50 dark:bg-gray-700/60 dark:border-gray-600">
                      <p className="font-semibold text-gray-900 dark:text-white mb-2">
                        שאלה {qIndex + 1}: {answer.questionText || 'טקסט שאלה חסר'}
                      </p>
                      {/* TODO: Display passage if available */}
                      <div className="space-y-1 text-sm">
                        {answer.options.map((option, oIndex) => (
                           <p key={oIndex} className={
                            `p-1 rounded ${oIndex === answer.correctAnswerIndex ? 'bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200' : ''} 
                             ${oIndex === answer.selectedAnswerIndex && !answer.isCorrect ? 'bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-200' : ''}
                             ${oIndex === answer.selectedAnswerIndex && answer.isCorrect ? 'font-bold' : ''}
                             `
                           }>
                             ({oIndex + 1}) {option}
                             {oIndex === answer.selectedAnswerIndex && <span> (תשובתך {answer.isCorrect ? '✅' : '❌'})</span>}
                           </p>
                        ))}
                      </div>
                       {/* TODO: Add Explanation field if available */}
                    </li>
                  ))}
                </ul>
              )}
              
              {!section.answers && section.sectionType !== 'essay' && (
                <p className="text-gray-500 dark:text-gray-400">אין נתוני תשובות עבור פרק זה.</p>
              )}
            </div>
          ))}
        </div>

        {/* Back Button */}
        <div className="mt-8 pt-6 border-t dark:border-gray-700 text-center">
           <Link
            href="/dashboard"
            className="inline-block px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm transition duration-150 ease-in-out"
          >
            חזרה ללוח הבקרה
          </Link>
        </div>

      </div>
    </div>
  );
} 