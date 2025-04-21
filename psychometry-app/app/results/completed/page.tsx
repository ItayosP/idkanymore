'use client';

import React from 'react';
import Link from 'next/link';

export default function TestCompletedPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 p-6">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl text-center max-w-md">
        <h1 className="text-3xl font-bold text-green-600 dark:text-green-400 mb-4">
          המבחן הושלם!
        </h1>
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          כל הכבוד! סיימת את המבחן הפסיכומטרי המלא.
        </p>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          (בקרוב יוצגו כאן התוצאות המפורטות והחיבור שכתבת)
        </p>
        <Link
          href="/dashboard"
          className="inline-block px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm transition duration-150 ease-in-out"
        >
          חזרה ללוח הבקרה
        </Link>
      </div>
    </div>
  );
} 