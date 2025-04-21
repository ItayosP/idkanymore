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

export default function FullTestPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [essayPosition, setEssayPosition] = useState<'start' | 'end' | null>(null);
  const [testSequence, setTestSequence] = useState<SectionDefinition[] | null>(null);
  const [essayContent, setEssayContent] = useState<string>('');
  const [allAnswers, setAllAnswers] = useState<{ [sectionIndex: number]: { [questionId: string]: number } }>({});
  const [sectionQuestions, setSectionQuestions] = useState<{ [sectionIndex: number]: Question[] }>({});
  const [isLoading, setIsLoading] = useState(false); // Loading state for questions
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
        const dummyQuestions: Question[] = Array.from({ length: section.type === 'verbal' ? 23 : 20 }, (_, i) => ({
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

  const handleNextStep = () => {
    if (testSequence && currentStep < testSequence.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Test finished
      console.log("Full test finished!");
      console.log("Final Answers:", allAnswers);
      console.log("Essay Content:", essayContent);
      // TODO: Calculate score (considering pilots)
      // TODO: Submit data to backend (e.g., POST /api/test/complete)
      
      // Navigate to the results page
      router.push('/results/completed'); 
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
    </div>
  );
} 