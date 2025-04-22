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
  correctAnswer: string;
  explanation: string;
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
  const [testSequence, setTestSequence] = useState<SectionDefinition[] | null>(null);
  const [essayContent, setEssayContent] = useState<string>('');
  const [allAnswers, setAllAnswers] = useState<{ [sectionIndex: number]: { [questionId: string]: number } }>({});
  const [sectionQuestions, setSectionQuestions] = useState<{ [sectionIndex: number]: Question[] }>({});
  const [isLoading, setIsLoading] = useState(false); // Loading state for questions
  const [isSubmitting, setIsSubmitting] = useState(false); // Submission loading state
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const router = useRouter();

  // Initialize test sequence on component mount
  useEffect(() => {
    const essayTask = BASE_TEST_STRUCTURE.find(s => s.type === 'essay');
    let mcSections = BASE_TEST_STRUCTURE.filter(s => s.type !== 'essay');
    
    // Shuffle the MC sections
    mcSections = shuffleArray(mcSections);
    
    if (!essayTask) {
      console.error("Essay task definition missing!");
      return;
    }

    // Always place essay at the start
    const sequence: SectionDefinition[] = [essayTask, ...mcSections];
    setTestSequence(sequence);
  }, []);

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
        const response = await fetch(`/api/questions?type=${section.type}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch questions: ${response.status}`);
        }
        const data = await response.json();
        console.log("Raw questions data:", data);
        
        if (!Array.isArray(data) || data.length === 0) {
          throw new Error('No questions received from the server');
        }
        
        // Transform the questions to match the expected format
        const formattedQuestions: Question[] = data.map((q: any) => {
          // Ensure we have a valid question object
          if (!q) {
            console.error('Invalid question object:', q);
            return null;
          }

          // Parse options if they're stored as a string
          let parsedOptions = [];
          try {
            parsedOptions = typeof q.options === 'string' ? JSON.parse(q.options) : q.options;
          } catch (e) {
            console.error('Error parsing options for question', q.id, e);
            parsedOptions = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];
          }

          // Create formatted question
          const formattedQuestion = {
            id: q.id?.toString() || '',
            text: q.text || q.content || `Question ${q.id}`, // Try both text and content fields
            passage: q.passage || undefined,
            options: Array.isArray(parsedOptions) ? parsedOptions : ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
            correctAnswer: typeof q.correctAnswer === 'number' ? q.correctAnswer : 0
          };

          console.log('Formatted question:', formattedQuestion);
          return formattedQuestion;
        }).filter(Boolean); // Remove any null values

        if (formattedQuestions.length === 0) {
          throw new Error('No valid questions could be formatted');
        }

        console.log(`Formatted ${formattedQuestions.length} questions for section ${section.type}`);
        setSectionQuestions(prev => ({ ...prev, [sectionIndex]: formattedQuestions }));
      } catch (error) {
        console.error("Error fetching questions:", error);
        setSubmissionError(error instanceof Error ? error.message : 'שגיאה לא ידועה בטעינת השאלות');
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuestionsForSection(currentStep);

  }, [currentStep, testSequence, sectionQuestions]);
  // ----------------------------------------------

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

  // Render the initial loading screen
  if (!testSequence) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-100 dark:bg-gray-900">
        <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">מבחן פסיכומטרי מלא</h1>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <p className="mt-4 text-gray-700 dark:text-gray-300">מכין את המבחן...</p>
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