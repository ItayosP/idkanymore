import React, { useState, useEffect } from 'react';

const ESSAY_TIME_LIMIT_SECONDS = 30 * 60; // 30 minutes

const EssayTask = ({ onSave }) => { // Accept onSave prop
  const [essayText, setEssayText] = useState('');
  const [timeLeft, setTimeLeft] = useState(ESSAY_TIME_LIMIT_SECONDS);
  const [isRunning, setIsRunning] = useState(true); // Timer starts automatically

  const essayPrompt = `
    הפילוסוף ישעיהו ברלין הבחין בין "חירות שלילית" (חירות מ...) – היעדר כפייה חיצונית – לבין "חירות חיובית" (חירות ל...) – היכולת לפעול באופן אוטונומי ולהגשים את עצמך. הוא הזהיר כי השאיפה ל"חירות חיובית", כאשר היא מפורשת באופן קולקטיבי או מטפיזי, עלולה להוביל באופן פרדוקסלי דווקא לדיכוי ולטוטליטריות בשם "האני האמיתי" או "טובת הכלל".

    דון/י במתח הפילוסופי שבין שני מושגי החירות הללו. האם ובאילו נסיבות החיפוש אחר "חירות חיובית" עלול לסכן את "החירות השלילית"? נמק/י את עמדתך תוך התייחסות למושגיו של ברלין ולדוגמאות רלוונטיות.
  `;

  useEffect(() => {
    if (!isRunning || timeLeft <= 0) return;

    const timerInterval = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timerInterval); // Cleanup on unmount or when isRunning changes
  }, [isRunning, timeLeft]);

  useEffect(() => {
    if (timeLeft === 0) {
      setIsRunning(false);
      // Optional: Auto-save or notify user time is up
      console.log("Time is up!");
      // handleSave(); // Potentially auto-save
    }
  }, [timeLeft]);

  const handleTextChange = (event) => {
    setEssayText(event.target.value);
  };

  const handleSave = () => {
    if (onSave) {
      onSave(essayText);
      setIsRunning(false); // Stop timer on explicit save
      console.log("Essay saved:", essayText.substring(0, 100) + "...");
    } else {
      console.warn("onSave handler not provided to EssayTask component.");
    }
    // TODO: Implement actual save logic (e.g., API call)
  };

  // Format time left as MM:SS
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div dir="rtl" className="space-y-6 p-4 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white">מטלת כתיבה</h2>
      
      <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-md space-y-3">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">הנחיות</h3>
        <p className="text-sm text-gray-700 dark:text-gray-300">
          לרשותך 30 דקות. קרא/י בעיון את המשימה וכתוב/י חיבור בהתאם להנחיות. הקפד/י על כתיבה עיונית, מעמיקה, מנומקת, רהוטה ומדויקת. הימנע/י מכתיבה אישית או סיפורית.
        </p>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white pt-2">המשימה</h3>
        <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-line">
          {essayPrompt}
        </p>
      </div>

      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">כתוב/י את חיבורך כאן:</h3>
        <div className="text-lg font-semibold tabular-nums" style={{ color: timeLeft < 60 ? 'red' : 'inherit' }}>
          זמן נותר: {formatTime(timeLeft)}
        </div>
      </div>

      <textarea
        className="w-full h-64 p-3 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-gray-700 dark:text-white resize-y"
        value={essayText}
        onChange={handleTextChange}
        placeholder="התחל/י לכתוב..."
        disabled={timeLeft <= 0} // Disable input when time is up
        rows={10} // Initial rows, but height is controlled by h-64 and resize-y
      />

      {/* TODO: Add optional line/word count display here */}

      <button
        onClick={handleSave}
        disabled={timeLeft <= 0} // Disable save button when time is up
        className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
      >
        שמור חיבור
      </button>

      {timeLeft <= 0 && (
        <p className="text-red-600 dark:text-red-400 font-semibold mt-2">הזמן הסתיים!</p>
      )}
    </div>
  );
};

export default EssayTask; 