'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter
import EssayTask from '../../components/EssayTask';
import TestSection from '../../components/TestSection'; // Import TestSection

// Define expected Question structure (adjust based on actual data)
interface Question {
  id: string;
  text: string;
  passage?: string;
  options: string[];
}

interface SectionDefinition {
  type: 'essay' | 'verbal' | 'quantitative' | 'english' | 'pilot'; // Expanded type
  duration: number;
  // We might add specific question set IDs or difficulty later
}

// Base structure - Pilot types are placeholders here
const BASE_TEST_STRUCTURE: SectionDefinition[] = [
  { type: 'essay', duration: 30 * 60 },
  { type: 'verbal', duration: 20 * 60 },
  { type: 'verbal', duration: 20 * 60 },
  { type: 'quantitative', duration: 20 * 60 },
  { type: 'quantitative', duration: 20 * 60 },
  { type: 'english', duration: 20 * 60 },
  { type: 'english', duration: 20 * 60 },
  { type: 'pilot', duration: 20 * 60 }, // Placeholder pilot 1
  { type: 'pilot', duration: 20 * 60 }, // Placeholder pilot 2
];

// Helper function to shuffle array (Fisher-Yates)
function shuffleArray<T>(array: T[]): T[] {
  let currentIndex = array.length, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
  return array;
}

// --- Interfaces and Constants ---
interface AnswerData {
    questionId: string;
    selectedAnswerIndex: number;
    // isCorrect?: boolean; // We might not need this on the frontend if backend calculates score
    // timeSpent?: number; // We might not track per-question time yet
}

interface SectionSubmissionData {
    type: 'verbal' | 'quantitative' | 'english' | 'pilot' | 'essay';
    isPilot: boolean;
    answers?: AnswerData[]; // For MC sections
    essayContent?: string; // For essay section
    // sectionTimeSpent?: number; // Might add later
}

export default function FullTestPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [essayPosition, setEssayPosition] = useState<'start' | 'end' | null>(null);
  const [testSequence, setTestSequence] = useState<SectionDefinition[] | null>(null);
  const [essayContent, setEssayContent] = useState<string>('');
  const [allAnswers, setAllAnswers] = useState<{ [sectionIndex: number]: { [questionId: string]: number } }>({});
  const [sectionQuestions, setSectionQuestions] = useState<{ [sectionIndex: number]: Question[] }>({});
  const [isLoading, setIsLoading] = useState(false); // Loading state for questions
  const [isSubmitting, setIsSubmitting] = useState(false); // Submission loading state
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const router = useRouter(); // Get router instance

  // --- Question Fetching Logic (Placeholder) ---
  useEffect(() => {
    if (!testSequence) return;
    
    const fetchQuestionsForSection = async (sectionIndex: number) => {
      if (sectionQuestions[sectionIndex]) return; // Already fetched

      const section = testSequence[sectionIndex];
      if (section.type === 'essay') return; // No questions for essay

      setIsLoading(true);
      console.log(`Fetching questions for ${section.type} section (index ${sectionIndex})...`);
      try {
        // TODO: Replace with actual API call
        // Example: const response = await fetch(`/api/questions?section=${section.type}&count=20`);
        // const data = await response.json();
        // Simulate API call delay and dummy data
        await new Promise(resolve => setTimeout(resolve, 500)); 
        const dummyQuestions: Question[] = Array.from({ length: 1 }, (_, i) => ({
            id: `${section.type}-${sectionIndex}-${i + 1}`,
            text: `זוהי שאלה מספר ${i + 1} מפרק ${section.type} (מדד ${sectionIndex}). ${section.type === 'pilot' ? '(פיילוט)': ''}`,
            options: ['תשובה 1', 'תשובה 2', 'תשובה 3', 'תשובה 4']
        }));
        
        setSectionQuestions(prev => ({ ...prev, [sectionIndex]: dummyQuestions }));
      } catch (error) {
        console.error("Error fetching questions:", error);
        // TODO: Handle fetch error state
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuestionsForSection(currentStep);

  }, [currentStep, testSequence, sectionQuestions]);
  // ----------------------------------------------

  const handleEssayPositionSelect = (position: 'start' | 'end') => {
    setEssayPosition(position);
    
    const essayTask = BASE_TEST_STRUCTURE.find(s => s.type === 'essay');
    let mcSections = BASE_TEST_STRUCTURE.filter(s => s.type !== 'essay');
    
    // --- Pilot Section Handling ---
    // Determine actual types for pilot sections (e.g., randomly assign)
    // For now, let's keep them marked as 'pilot' but assign a specific type internally if needed
    const pilotSections = mcSections.filter(s => s.type === 'pilot');
    const nonPilotSections = mcSections.filter(s => s.type !== 'pilot');

    // Example: Randomly assign types to pilot sections (or fetch specific pilot sets)
    // const possiblePilotTypes = ['verbal', 'quantitative', 'english'];
    // pilotSections[0].actualType = possiblePilotTypes[Math.floor(Math.random() * 3)];
    // pilotSections[1].actualType = possiblePilotTypes[Math.floor(Math.random() * 3)];
    // --- (End Pilot Handling Example) ---
    
    mcSections = shuffleArray(mcSections); // Shuffle the MC sections
    // ------------------------------

    if (!essayTask) {
      console.error("Essay task definition missing!");
      return;
    }

    let sequence: SectionDefinition[] = [];
    if (position === 'start') {
      sequence = [essayTask, ...mcSections];
    } else {
      sequence = [...mcSections, essayTask];
    }
    setTestSequence(sequence);
    setCurrentStep(0); 
    setAllAnswers({}); // Reset answers
    setSectionQuestions({}); // Reset questions
  };

  const handleSaveEssay = (text: string) => {
    console.log("Handling essay save in FullTestPage...");
    setEssayContent(text);
    // TODO: Save essay to backend when test is fully complete
    handleNextStep();
  };

  const handleSectionComplete = (sectionAnswers: { [questionId: string]: number }) => {
    console.log(`Section ${currentStep} (${testSequence?.[currentStep]?.type}) completed. Answers:`, sectionAnswers);
    setAllAnswers(prev => ({ ...prev, [currentStep]: sectionAnswers }));
    handleNextStep();
  };

  const handleFinishTest = async () => {
    if (!testSequence) return;
    console.log("Attempting to finish full test...");
    setIsSubmitting(true);
    setSubmissionError(null);

    // 1. Prepare submission data
    const submissionData: { 
      testType: string;
      sections: SectionSubmissionData[];
      essayContent: string;
      overallTimeSpent?: number; // TODO: Implement overall timer
    } = {
        testType: 'full',
        essayContent: essayContent,
        sections: testSequence.map((sectionDef, index) => {
            const sectionResult: SectionSubmissionData = {
                type: sectionDef.type === 'pilot' ? 'pilot' : sectionDef.type, // Map pilot correctly
                isPilot: sectionDef.type === 'pilot',
            };
            if (sectionDef.type === 'essay') {
                // Essay content is handled separately at the top level
            } else {
                const answersForSection = allAnswers[index] || {};
                const questionsForSection = sectionQuestions[index] || [];
                sectionResult.answers = questionsForSection.map(q => ({
                    questionId: q.id,
                    selectedAnswerIndex: answersForSection[q.id] ?? -1, // Use -1 or null for unanswered
                }));
            }
            return sectionResult;
        })
    };

    console.log("Submitting Data:", JSON.stringify(submissionData, null, 2));

    // 2. Send data to backend
    try {
      const response = await fetch('/api/test/complete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submissionData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Server responded with ${response.status}`);
      }

      const result = await response.json();

      if (result.success && result.attemptId) {
        console.log("Test submitted successfully. Attempt ID:", result.attemptId);
        // 3. Navigate to the dynamic results page
        router.push(`/results/${result.attemptId}`);
      } else {
        throw new Error("Submission response missing success or attemptId.");
      }

    } catch (error) {
      console.error("Error submitting test:", error);
      setSubmissionError(error instanceof Error ? error.message : "שגיאה בשליחת המבחן.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNextStep = () => {
    if (testSequence && currentStep < testSequence.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Test finished - trigger submission
      handleFinishTest(); 
    }
  };

  // Render the initial choice screen
  if (!essayPosition || !testSequence) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-100 dark:bg-gray-900">
        <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">מבחן פסיכומטרי מלא</h1>
        <p className="mb-4 text-gray-700 dark:text-gray-300">האם תרצה/י לבצע את מטלת הכתיבה בתחילת המבחן או בסופו?</p>
        <div className="flex space-x-4 space-x-reverse">
          <button 
            onClick={() => handleEssayPositionSelect('start')} 
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm transition duration-150 ease-in-out"
          >
            בתחילה
          </button>
          <button 
            onClick={() => handleEssayPositionSelect('end')} 
            className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg shadow-sm transition duration-150 ease-in-out"
          >
            בסוף
          </button>
        </div>
      </div>
    );
  }

  // Render the current step based on the sequence
  const currentSectionDef = testSequence[currentStep];
  const currentQuestions = sectionQuestions[currentStep];

  // Add Submission Error Display
  if (submissionError) {
     return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">שגיאה בשליחת המבחן</h1>
        <p className="text-gray-700 dark:text-gray-300 mb-6">{submissionError}</p>
        <button 
            onClick={() => handleFinishTest()} // Retry button
            disabled={isSubmitting}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm transition duration-150 ease-in-out disabled:opacity-50"
          >
            {isSubmitting ? 'שולח...' : 'נסה שוב לשלוח'}
          </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8 lg:p-12 bg-gray-100 dark:bg-gray-900">
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white text-center">מבחן פסיכומטרי מלא - שלב {currentStep + 1}/{testSequence.length}</h1>
      
      {isLoading && (
         <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="ml-4 text-gray-600 dark:text-gray-300">טוען שאלות...</p>
        </div>
      )}

      {!isLoading && currentSectionDef.type === 'essay' && (
        <EssayTask onSave={handleSaveEssay} />
      )}

      {!isLoading && currentSectionDef.type !== 'essay' && currentQuestions && (
        <TestSection 
          key={currentStep} // Add key to ensure re-render on step change
          sectionType={currentSectionDef.type} 
          questions={currentQuestions}
          duration={currentSectionDef.duration}
          onComplete={handleSectionComplete}
          isPilot={currentSectionDef.type === 'pilot'} // Pass pilot status
        />
      )} 

      {!isLoading && currentSectionDef.type !== 'essay' && !currentQuestions && (
         <div className="flex items-center justify-center h-64 text-red-500">
            שגיאה בטעינת שאלות לפרק זה.
         </div>
      )}
      
      {/* Progress bar */}
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mt-8">
          <div 
              className="bg-blue-600 h-2.5 rounded-full"
              style={{ width: `${((currentStep + 1) / testSequence.length) * 100}%` }}
          ></div>
      </div>

      {/* Submission Loading Overlay (Optional) */}
      {isSubmitting && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-white"></div>
          <p className="ml-4 text-white text-xl">מעבד ושולח תוצאות...</p>
        </div>
      )}
    </div>
  );
} 