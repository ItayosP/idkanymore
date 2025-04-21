'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

// Updated interfaces to match the enhanced API response
interface UserData {
  name?: string | null;
  email?: string | null;
  image?: string | null; // Added image
}

interface ProgressItem {
  count: number;
  averageScore: number;
  bestScore: number; // Added best score
}

interface ProgressData {
  [section: string]: ProgressItem;
}

interface RecentAttempt {
  id: string;
  section: string;
  score: number;
  completedAt: string; // Date will be a string after JSON stringify/parse
}

interface ProfileDashboardData {
  user: UserData;
  progress: ProgressData;
  recentAttempts: RecentAttempt[]; // Added recent attempts
}

export default function ProfilePage() {
  const { status: authStatus } = useSession(); // Use session status directly
  const [profileData, setProfileData] = useState<ProfileDashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
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
          const data: ProfileDashboardData = await response.json(); // Use updated interface
          setProfileData(data);
        } catch (err) {
          console.error('Error fetching profile data:', err);
          setError(err instanceof Error ? err.message : 'שגיאה בטעינת נתוני הפרופיל.');
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    } else if (authStatus === 'unauthenticated') {
      router.push('/api/auth/signin'); 
    }
  }, [authStatus, router]);

  // Loading state
  if (authStatus === 'loading' || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <p className="ml-4 text-gray-600 dark:text-gray-300">טוען פרופיל...</p>
      </div>
    );
  }
  
  // Error State
  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">
          שגיאה בטעינת הפרופיל
        </h1>
        <p className="text-gray-700 dark:text-gray-300 mb-6">{error}</p>
        <Link href="/dashboard" className="text-blue-500 hover:underline">חזרה ללוח הבקרה</Link>
      </div>
    );
  }

  // Data Missing State (Should be rare if API is ok)
  if (!profileData?.user) {
     return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">לא ניתן היה לטעון את נתוני הפרופיל.</h1>
        <Link
          href="/dashboard"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
        >
          חזרה ללוח הבקרה
        </Link>
      </div>
    );
  }

  const { user, progress, recentAttempts } = profileData;

  const getSectionName = (section: string) => {
    switch (section) {
      case 'verbal': return 'חשיבה מילולית';
      case 'quantitative': return 'חשיבה כמותית';
      case 'english': return 'אנגלית';
      default: return section;
    }
  };

  // Function to format date string
  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('he-IL', { 
        year: 'numeric', month: 'short', day: 'numeric' 
      });
    } catch (e) {
      return 'תאריך לא ידוע';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* User Info Header */}
        <div className="flex items-center mb-8 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
          {user.image ? (
            <img src={user.image} alt={user.name || 'User avatar'} className="w-16 h-16 rounded-full mr-6 border-2 border-blue-500" />
          ) : (
            <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center text-white text-2xl font-semibold mr-6">
              {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </div>
          )}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {user.name || 'פרופיל משתמש'}
            </h1>
            <p className="text-md text-gray-600 dark:text-gray-400">
              {user.email || 'כתובת אימייל לא זמינה'}
            </p>
            {/* Maybe add member since date if available */}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left Column: Performance Summary */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-5 border-b dark:border-gray-700 pb-3">
              סיכום ביצועים
            </h2>
            {progress && Object.keys(progress).length > 0 ? (
              <div className="space-y-5">
                {Object.entries(progress).map(([section, data]) => (
                  <div key={section} className="bg-gray-50 dark:bg-gray-700/60 rounded-lg p-4 shadow-sm transition hover:shadow-md">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">{getSectionName(section)}</h3>
                    <div className="flex flex-wrap justify-between items-center gap-4 text-sm">
                      <div className="text-center">
                        <p className="text-gray-500 dark:text-gray-400">מבחנים</p>
                        <p className="font-bold text-lg text-gray-700 dark:text-gray-200">{data.count}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-gray-500 dark:text-gray-400">ציון ממוצע</p>
                        <p className="font-bold text-lg text-blue-600 dark:text-blue-400">{data.averageScore}%</p>
                        {/* Simple Bar Representation */}
                        <div className="w-16 h-2 bg-gray-200 dark:bg-gray-600 rounded-full mx-auto mt-1">
                          <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${data.averageScore}%` }}></div>
                        </div>
                      </div>
                      <div className="text-center">
                        <p className="text-gray-500 dark:text-gray-400">ציון שיא</p>
                        <p className="font-bold text-lg text-green-600 dark:text-green-400">{data.bestScore}%</p>
                        <div className="w-16 h-2 bg-gray-200 dark:bg-gray-600 rounded-full mx-auto mt-1">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: `${data.bestScore}%` }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-gray-50 dark:bg-gray-700/60 rounded-lg p-6 text-center shadow-sm">
                <p className="text-gray-600 dark:text-gray-400">אין עדיין נתוני ביצועים.</p>
              </div>
            )}
          </div>

          {/* Right Column: Recent Activity */}
          <div className="lg:col-span-1 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
             <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-5 border-b dark:border-gray-700 pb-3">
              פעילות אחרונה
            </h2>
            {recentAttempts && recentAttempts.length > 0 ? (
              <ul className="space-y-4">
                {recentAttempts.map((attempt) => (
                  <li key={attempt.id} className="flex justify-between items-center bg-gray-50 dark:bg-gray-700/60 p-3 rounded-md shadow-sm transition hover:shadow-md">
                    <div>
                      <span className="font-medium text-gray-800 dark:text-white">{getSectionName(attempt.section)}</span>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{formatDate(attempt.completedAt)}</p>
                    </div>
                    <span className={`font-semibold ${attempt.score >= 70 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                      {attempt.score}%
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600 dark:text-gray-400">אין מבחנים אחרונים להצגה.</p>
            )}
             <Link 
                href="/tests"
                className="mt-6 block w-full text-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition duration-200 text-sm font-medium"
              >
                התחל מבחן חדש
              </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 