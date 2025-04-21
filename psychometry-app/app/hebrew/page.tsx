'use client';

import { useState } from 'react';
import TestInterface from '../components/TestInterface';

export default function HebrewPage() {
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);

  const subcategories = [
    { id: 'reading', name: 'הבנת הנקרא' },
    { id: 'analogies', name: 'אנלוגיות' },
    { id: 'sentence-completion', name: 'השלמת משפטים' },
    { id: 'logic', name: 'לוגיקה' }
  ];

  if (!selectedSubcategory) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800 py-8">
        <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-right">מבחן בעברית</h1>
            <div className="space-y-4">
              {subcategories.map((subcategory) => (
                <button
                  key={subcategory.id}
                  onClick={() => setSelectedSubcategory(subcategory.id)}
                  className="w-full px-4 py-2 text-right text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
                >
                  {subcategory.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <TestInterface section="hebrew" subcategory={selectedSubcategory} />;
} 