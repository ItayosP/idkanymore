import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const verbalQuestions: Question[] = [
  {
    id: 1,
    text: "מה המשמעות של המילה 'אנכרוניזם'?",
    options: [
      "שימוש במונח או רעיון שאינו מתאים לתקופה",
      "תיאור מדויק של אירוע היסטורי",
      "שימוש במילים נרדפות",
      "תיאור של אירוע עתידי"
    ],
    correctAnswer: 0,
    explanation: "אנכרוניזם הוא שימוש במונח, רעיון או אובייקט שאינו מתאים לתקופה המתוארת. לדוגמה, אם נציג אדם מימי הביניים משתמש בטלפון סלולרי, זהו אנכרוניזם."
  },
  {
    id: 2,
    text: "מה המשמעות של הביטוי 'להשליך יהבו'?",
    options: [
      "להתפלל",
      "להתאבד",
      "להתמסר",
      "להתנצל"
    ],
    correctAnswer: 2,
    explanation: "הביטוי 'להשליך יהבו' משמעותו להתמסר, לסמוך על מישהו או משהו. מקור הביטוי בתנ\"ך, בספר תהילים."
  },
  {
    id: 3,
    text: "מה המשמעות של המילה 'אפוריזם'?",
    options: [
      "משפט קצר וחכם",
      "סוג של מחלה",
      "תיאור של צבע",
      "סוג של צמח"
    ],
    correctAnswer: 0,
    explanation: "אפוריזם הוא משפט קצר וחכם המכיל אמת או עצה חשובה. לדוגמה: 'דע את עצמך' הוא אפוריזם מפורסם."
  },
  {
    id: 4,
    text: "מה המשמעות של הביטוי 'לשבור את הקרח'?",
    options: [
      "להתחיל שיחה או היכרות",
      "להרוס דבר מה",
      "להתקרר",
      "להתגבר על מכשול"
    ],
    correctAnswer: 0,
    explanation: "הביטוי 'לשבור את הקרח' משמעותו להתחיל שיחה או היכרות, בדרך כלל במצב של מבוכה או ריחוק."
  },
  {
    id: 5,
    text: "מה המשמעות של המילה 'פרדוקס'?",
    options: [
      "סתירה לכאורה",
      "סוג של בעיה מתמטית",
      "תיאור של מצב רגשי",
      "סוג של טיעון"
    ],
    correctAnswer: 0,
    explanation: "פרדוקס הוא סתירה לכאורה או מצב שנראה בלתי אפשרי אך הוא נכון. לדוגמה: 'המשפט הזה הוא שקר' הוא פרדוקס."
  },
  {
    id: 6,
    text: "מה המשמעות של הביטוי 'להחזיק את המקל בשני קצותיו'?",
    options: [
      "לנסות לרצות את כולם",
      "להתאמן בספורט",
      "להתמודד עם קושי",
      "להתנהג בחוסר החלטיות"
    ],
    correctAnswer: 3,
    explanation: "הביטוי 'להחזיק את המקל בשני קצותיו' משמעותו להתנהג בחוסר החלטיות או לנסות להיות בצד של כולם."
  },
  {
    id: 7,
    text: "מה המשמעות של המילה 'אוקסימורון'?",
    options: [
      "צירוף מילים סותר",
      "סוג של מכשיר מדעי",
      "תיאור של מצב רגשי",
      "סוג של טיעון לוגי"
    ],
    correctAnswer: 0,
    explanation: "אוקסימורון הוא צירוף של מילים הסותרות זו את זו, כמו 'שתיקה רועמת' או 'חושך מאיר'."
  },
  {
    id: 8,
    text: "מה המשמעות של הביטוי 'להתפלפל בשערה'?",
    options: [
      "להתווכח על דברים קטנים",
      "להתאמן בספורט",
      "להתמודד עם קושי",
      "להתנהג בחוסר החלטיות"
    ],
    correctAnswer: 0,
    explanation: "הביטוי 'להתפלפל בשערה' משמעותו להתווכח או לדון בדברים קטנים וחסרי חשיבות."
  },
  {
    id: 9,
    text: "מה המשמעות של המילה 'מטאפורה'?",
    options: [
      "השוואה בלתי ישירה",
      "סוג של מכשיר מדעי",
      "תיאור של מצב רגשי",
      "סוג של טיעון לוגי"
    ],
    correctAnswer: 0,
    explanation: "מטאפורה היא השוואה בלתי ישירה בין שני דברים, כמו 'היא שמש המשפחה'."
  },
  {
    id: 10,
    text: "מה המשמעות של הביטוי 'להפוך את הקערה על פיה'?",
    options: [
      "לשנות את הסדר הקיים",
      "להתאמן בספורט",
      "להתמודד עם קושי",
      "להתנהג בחוסר החלטיות"
    ],
    correctAnswer: 0,
    explanation: "הביטוי 'להפוך את הקערה על פיה' משמעותו לשנות את הסדר הקיים או להפוך את המצב על ראשו."
  }
];

const quantitativeQuestions: Question[] = [
  {
    id: 1,
    text: "מהו ערכו של x במשוואה: 2x + 5 = 15?",
    options: [
      "5",
      "10",
      "7.5",
      "20"
    ],
    correctAnswer: 0,
    explanation: "כדי לפתור את המשוואה, נחסר 5 משני הצדדים: 2x = 10. לאחר מכן נחלק ב-2: x = 5."
  },
  {
    id: 2,
    text: "מהו שטחו של משולש שווה צלעות שאורך צלעו 6 ס\"מ?",
    options: [
      "9√3",
      "18",
      "12√3",
      "36"
    ],
    correctAnswer: 0,
    explanation: "שטח משולש שווה צלעות מחושב על ידי הנוסחה: (צלע² * √3) / 4. במקרה זה: (6² * √3) / 4 = 9√3."
  },
  {
    id: 3,
    text: "מהו ערכו של x במשוואה: 3(x + 4) = 21?",
    options: [
      "3",
      "5",
      "7",
      "9"
    ],
    correctAnswer: 0,
    explanation: "ראשית נחלק את שני הצדדים ב-3: x + 4 = 7. לאחר מכן נחסר 4: x = 3."
  },
  {
    id: 4,
    text: "מהו היקף המעגל שקוטרו 10 ס\"מ?",
    options: [
      "10π",
      "20π",
      "25π",
      "100π"
    ],
    correctAnswer: 0,
    explanation: "היקף מעגל מחושב על ידי הנוסחה: π × קוטר. במקרה זה: π × 10 = 10π."
  },
  {
    id: 5,
    text: "מהו ערכו של x במשוואה: x² - 9 = 0?",
    options: [
      "3 או -3",
      "9",
      "81",
      "0"
    ],
    correctAnswer: 0,
    explanation: "נוסיף 9 לשני הצדדים: x² = 9. לכן x = 3 או x = -3."
  },
  {
    id: 6,
    text: "מהו נפח קובייה שאורך צלעה 4 ס\"מ?",
    options: [
      "64",
      "16",
      "32",
      "48"
    ],
    correctAnswer: 0,
    explanation: "נפח קובייה מחושב על ידי הנוסחה: צלע³. במקרה זה: 4³ = 64."
  },
  {
    id: 7,
    text: "מהו ערכו של x במשוואה: 4x - 8 = 2x + 6?",
    options: [
      "7",
      "5",
      "3",
      "1"
    ],
    correctAnswer: 0,
    explanation: "נעביר את כל ה-x לצד אחד ואת המספרים לצד השני: 4x - 2x = 6 + 8. נקבל: 2x = 14, ולכן x = 7."
  },
  {
    id: 8,
    text: "מהו שטחו של מלבן שאורכו 8 ס\"מ ורוחבו 5 ס\"מ?",
    options: [
      "40",
      "13",
      "26",
      "20"
    ],
    correctAnswer: 0,
    explanation: "שטח מלבן מחושב על ידי הנוסחה: אורך × רוחב. במקרה זה: 8 × 5 = 40."
  },
  {
    id: 9,
    text: "מהו ערכו של x במשוואה: 2(x - 3) = x + 4?",
    options: [
      "10",
      "5",
      "7",
      "3"
    ],
    correctAnswer: 0,
    explanation: "נפתח סוגריים: 2x - 6 = x + 4. נעביר את כל ה-x לצד אחד ואת המספרים לצד השני: 2x - x = 4 + 6. נקבל: x = 10."
  },
  {
    id: 10,
    text: "מהו שטחו של מעגל שרדיוסו 5 ס\"מ?",
    options: [
      "25π",
      "10π",
      "50π",
      "100π"
    ],
    correctAnswer: 0,
    explanation: "שטח מעגל מחושב על ידי הנוסחה: π × רדיוס². במקרה זה: π × 5² = 25π."
  }
];

const englishQuestions: Question[] = [
  {
    id: 1,
    text: "Choose the correct word to complete the sentence: The students were _____ to hear about the field trip.",
    options: [
      "excited",
      "exciting",
      "excite",
      "excitement"
    ],
    correctAnswer: 0,
    explanation: "The correct answer is 'excited' because it is an adjective describing how the students felt. 'Exciting' would describe the field trip itself, not the students' feelings."
  },
  {
    id: 2,
    text: "Which sentence is grammatically correct?",
    options: [
      "She has been working here since 2010.",
      "She is working here since 2010.",
      "She works here since 2010.",
      "She worked here since 2010."
    ],
    correctAnswer: 0,
    explanation: "The present perfect continuous tense ('has been working') is used to describe an action that started in the past and continues to the present. The word 'since' indicates the starting point of the action."
  },
  {
    id: 3,
    text: "Choose the correct word: The _____ of the book was very interesting.",
    options: [
      "content",
      "contain",
      "contents",
      "containing"
    ],
    correctAnswer: 0,
    explanation: "'Content' is the correct noun form here, referring to what is inside the book. 'Contents' would refer to a table of contents."
  },
  {
    id: 4,
    text: "Which sentence uses the correct tense?",
    options: [
      "I have lived here for five years.",
      "I am living here for five years.",
      "I live here for five years.",
      "I was living here for five years."
    ],
    correctAnswer: 0,
    explanation: "The present perfect tense ('have lived') is used to describe an action that started in the past and continues to the present. The phrase 'for five years' indicates duration."
  },
  {
    id: 5,
    text: "Choose the correct preposition: She is good _____ mathematics.",
    options: [
      "at",
      "in",
      "on",
      "with"
    ],
    correctAnswer: 0,
    explanation: "The preposition 'at' is used with the adjective 'good' when referring to skills or abilities."
  },
  {
    id: 6,
    text: "Which sentence is correct?",
    options: [
      "Neither of the answers is correct.",
      "Neither of the answers are correct.",
      "Neither of the answer is correct.",
      "Neither of the answer are correct."
    ],
    correctAnswer: 0,
    explanation: "When 'neither' is the subject, it takes a singular verb. Also, 'answers' is plural because we're referring to multiple answers."
  },
  {
    id: 7,
    text: "Choose the correct word: The _____ of the movie was unexpected.",
    options: [
      "ending",
      "end",
      "ended",
      "ends"
    ],
    correctAnswer: 0,
    explanation: "'Ending' is the correct noun form here, referring to how the movie concluded."
  },
  {
    id: 8,
    text: "Which sentence uses the correct article?",
    options: [
      "She is the best student in the class.",
      "She is best student in the class.",
      "She is a best student in the class.",
      "She is an best student in the class."
    ],
    correctAnswer: 0,
    explanation: "The definite article 'the' is used with superlative adjectives like 'best'."
  },
  {
    id: 9,
    text: "Choose the correct word: The _____ of the problem was complex.",
    options: [
      "solution",
      "solve",
      "solving",
      "solved"
    ],
    correctAnswer: 0,
    explanation: "'Solution' is the correct noun form here, referring to the answer to the problem."
  },
  {
    id: 10,
    text: "Which sentence is correct?",
    options: [
      "If I were you, I would study more.",
      "If I was you, I would study more.",
      "If I am you, I would study more.",
      "If I be you, I would study more."
    ],
    correctAnswer: 0,
    explanation: "In hypothetical situations, we use 'were' instead of 'was' with 'I', even though it seems grammatically incorrect. This is called the subjunctive mood."
  }
];

export async function GET(request: Request) {
  console.log('Questions API: Received request');
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');
  console.log('Questions API: Request type:', type);

  let questions: Question[] = [];

  switch (type) {
    case 'verbal':
      console.log('Questions API: Returning verbal questions');
      questions = verbalQuestions;
      break;
    case 'quantitative':
      console.log('Questions API: Returning quantitative questions');
      questions = quantitativeQuestions;
      break;
    case 'english':
      console.log('Questions API: Returning english questions');
      questions = englishQuestions;
      break;
    default:
      console.error('Questions API: Invalid question type:', type);
      return NextResponse.json({ error: 'Invalid question type' }, { status: 400 });
  }

  console.log('Questions API: Returning', questions.length, 'questions');
  return NextResponse.json(questions);
} 