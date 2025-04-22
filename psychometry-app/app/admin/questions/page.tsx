'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

export default function QuestionManagement() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const ADMIN_USER_ID = process.env.NEXT_PUBLIC_ADMIN_USER_ID;

  useEffect(() => {
    if (status === 'unauthenticated' || session?.user?.id !== ADMIN_USER_ID) {
      router.push('/');
    }
  }, [session, status, router]);

  const [formData, setFormData] = useState({
    content: '',
    options: ['', '', '', ''],
    correctAnswer: '',
    section: 'verbal',
    difficulty: 'easy'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/questions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('השאלה נוספה בהצלחה!');
        setFormData({
          content: '',
          options: ['', '', '', ''],
          correctAnswer: '',
          section: 'verbal',
          difficulty: 'easy'
        });
      } else {
        const error = await response.json();
        alert(`שגיאה: ${error.error}`);
      }
    } catch (error) {
      alert('אירעה שגיאה בהוספת השאלה. אנא נסה שוב.');
    }
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...formData.options];
    newOptions[index] = value;
    setFormData({ ...formData, options: newOptions });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">ניהול שאלות</h1>
            <Link
              href="/admin/questions/import"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
            >
              ייבא שאלות מקובץ
            </Link>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 text-right">
                תוכן השאלה
              </label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-right"
                rows={4}
                required
                dir="rtl"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 text-right">
                אפשרויות תשובה
              </label>
              {formData.options.map((option, index) => (
                <input
                  key={index}
                  type="text"
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white mb-2 text-right"
                  placeholder={`אפשרות ${index + 1}`}
                  required
                  dir="rtl"
                />
              ))}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 text-right">
                תשובה נכונה
              </label>
              <select
                value={formData.correctAnswer}
                onChange={(e) => setFormData({ ...formData, correctAnswer: e.target.value })}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-right"
                required
                dir="rtl"
              >
                <option value="">בחר תשובה נכונה</option>
                {formData.options.map((option, index) => (
                  <option key={index} value={option}>
                    {option || `אפשרות ${index + 1}`}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 text-right">
                תחום
              </label>
              <select
                value={formData.section}
                onChange={(e) => setFormData({ ...formData, section: e.target.value })}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-right"
                required
                dir="rtl"
              >
                <option value="verbal">חשיבה מילולית</option>
                <option value="quantitative">חשיבה כמותית</option>
                <option value="english">אנגלית</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 text-right">
                רמת קושי
              </label>
              <select
                value={formData.difficulty}
                onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-right"
                required
                dir="rtl"
              >
                <option value="easy">קל</option>
                <option value="medium">בינוני</option>
                <option value="hard">קשה</option>
                <option value="very_hard">קשה מאוד</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition duration-200"
            >
              הוסף שאלה
            </button>
          </form>
        </div>
      </div>
    </div>
  );
} 