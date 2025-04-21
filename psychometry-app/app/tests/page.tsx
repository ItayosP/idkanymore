'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface TestSection {
  id: string;
  name: string;
  description: string;
  icon: string;
  path: string;
}

export default function TestsPage() {
  const [testSections] = useState<TestSection[]>([
    {
      id: 'full',
      name: 'מבחן פסיכומטרי מלא',
      description: 'סימולציה מלאה הכוללת את כל פרקי המבחן ומטלת כתיבה',
      icon: '⏱️',
      path: '/tests/full'
    },
    {
      id: 'verbal',
      name: 'חשיבה מילולית',
      description: 'תרגול שאלות בהבנת הנקרא, השלמת משפטים ואנלוגיות',
      icon: '📚',
      path: '/tests/verbal'
    },
    {
      id: 'quantitative',
      name: 'חשיבה כמותית',
      description: 'תרגול שאלות באלגברה, גיאומטריה ובעיות מילוליות',
      icon: '🔢',
      path: '/tests/quantitative'
    },
    {
      id: 'english',
      name: 'אנגלית',
      description: 'תרגול שאלות בהבנת הנקרא, השלמת משפטים ומילים נרדפות',
      icon: '🌐',
      path: '/tests/english'
    }
  ]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/profile', {
          credentials: 'include',
        });
        if (!response.ok) {
          router.push('/login');
          return;
        }
        setLoading(false);
      } catch (error) {
        console.error('Auth check failed:', error);
        router.push('/login');
      }
    };

    checkAuth();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            מבחנים
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            בחר את תחום התרגול הרצוי
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {testSections.map((section) => (
            <Link key={section.id} href={section.path} className="block">
              <div className="h-full flex flex-col bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="text-4xl mb-4">{section.icon}</div>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                  {section.name}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 flex-grow">
                  {section.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
} 