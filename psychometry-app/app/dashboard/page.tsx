'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

// Define interfaces for the fetched data
interface UserData {
  name?: string | null;
  email?: string | null;
}

interface ProgressItem {
  count: number;
  averageScore: number;
}

interface ProgressData {
  [section: string]: ProgressItem;
}

interface DashboardData {
  user: UserData;
  progress: ProgressData;
}

// Helper function to get display names for sections
const getSectionName = (section: string) => {
  switch (section) {
    case 'verbal': return 'חשיבה מילולית';
    case 'quantitative': return 'חשיבה כמותית';
    case 'english': return 'אנגלית';
    default: return section;
  }
};

export default function DashboardPage() {
  const { status: authStatus } = useSession(); // Only need status for auth check
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Only fetch data if authenticated
    if (authStatus === 'authenticated') {
      const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
          const response = await fetch('/api/dashboard');
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
          }
          const data: DashboardData = await response.json();
          setDashboardData(data);
        } catch (err) {
          console.error("Error fetching dashboard data:", err);
          setError(err instanceof Error ? err.message : 'שגיאה בטעינת נתוני לוח הבקרה.');
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    } else if (authStatus === 'unauthenticated') {
      setLoading(false); // Not loading if not authenticated
    } 
    // If authStatus is 'loading', the outer loading check handles it
  }, [authStatus]);

  // Combined Loading State (Auth check + Data Fetch)
  if (authStatus === 'loading' || (authStatus === 'authenticated' && loading)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <p className="ml-4 text-gray-600 dark:text-gray-300">טוען...</p>
      </div>
    );
  }

  // Unauthenticated State
  if (authStatus === 'unauthenticated') {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">נדרשת התחברות</h1>
            <p className="text-gray-700 dark:text-gray-300 mb-6">עליך להתחבר כדי לגשת ללוח הבקרה.</p>
            <Link
              href="/api/auth/signin"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
            >
              התחבר
            </Link>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">
          שגיאה בטעינת לוח הבקרה
        </h1>
        <p className="text-gray-700 dark:text-gray-300 mb-6">{error}</p>
        {/* Optional: Add a retry button? */}
      </div>
    );
  }

  // Authenticated State - Display Dashboard
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-6 sm:p-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            לוח בקרה
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
            ברוך הבא, {dashboardData?.user?.name || 'משתמש'}!
          </p>
          
          {/* Main Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Column: Start Test / Main Actions */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">התחל מבחן חדש</h2>
                <Link href="/tests" className="inline-block w-full text-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition duration-200">
                  בחירת מבחן
                </Link>
              </div>
              {/* Add other primary actions here if needed */}
            </div>

            {/* Right Column: Progress Overview */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 border-b pb-2 dark:border-gray-700">
                ההתקדמות שלך
              </h2>
              {dashboardData?.progress && Object.keys(dashboardData.progress).length > 0 ? (
                <div className="space-y-6">
                  {Object.entries(dashboardData.progress).map(([section, data]) => (
                    <div key={section} className="bg-gray-50 dark:bg-gray-700/60 rounded-lg p-4 shadow-sm flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{getSectionName(section)}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{data.count} מבחנים</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-blue-600 dark:text-blue-400">{data.averageScore}%</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">ציון ממוצע</p>
                        {/* Optional: Add progress bar */}
                        {/* <div className="w-24 bg-gray-200 dark:bg-gray-600 rounded-full h-2 mt-1">
                          <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${data.averageScore}%` }}></div>
                        </div> */} 
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-gray-50 dark:bg-gray-700/60 rounded-lg p-6 text-center shadow-sm">
                  <p className="text-gray-600 dark:text-gray-400">עדיין לא השלמת מבחנים. <Link href="/tests" className="text-blue-500 hover:underline">התחל מבחן ראשון!</Link></p>
                </div>
              )}
            </div>
            
            {/* Optional: Add other widgets like history, profile links here */}
            {/* These were removed as progress is now the main focus */}
            {/* <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">היסטוריית מבחנים</h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm">(בקרוב)</p>
            </div>
             <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">פרופיל</h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm">(בקרוב)</p>
            </div> */} 
          </div>
        </div>
      </div>
    </div>
  );
} 