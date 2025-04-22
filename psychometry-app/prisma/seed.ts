import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const verbalQuestions = [
  {
    content: 'מה המשמעות של המילה "נדיב"?',
    options: ['טוב לב', 'אכזר', 'אדיש', 'כועס'],
    correctAnswer: 'טוב לב',
    section: 'verbal',
    difficulty: 'easy'
  },
  {
    content: 'מה המילה ההפוכה במשמעותה ל"שקט"?',
    options: ['שליו', 'סוער', 'רגוע', 'נינוח'],
    correctAnswer: 'סוער',
    section: 'verbal',
    difficulty: 'medium'
  },
  {
    content: 'מה המשמעות של הביטוי "להחזיק את המקל בשני קצותיו"?',
    options: ['לנסות לרצות את כולם', 'להתאמן בספורט', 'להתמודד עם קושי', 'להתנהג בחוסר החלטיות'],
    correctAnswer: 'להתנהג בחוסר החלטיות',
    section: 'verbal',
    difficulty: 'hard'
  },
  {
    content: 'מה המשמעות של המילה "אפיסטמולוגיה"?',
    options: ['תורת ההכרה', 'תורת המוסר', 'תורת הלוגיקה', 'תורת האסתטיקה'],
    correctAnswer: 'תורת ההכרה',
    section: 'verbal',
    difficulty: 'very_hard'
  },
  {
    content: 'מה המשמעות של הביטוי "הניסיון ל________ את מורכבותה של התופעה לכדי מודל ________ ופשטני, ________ בהכרח את רבדיה העמוקים ואת הגורמים הרבים המעצבים אותה"?',
    options: ['לצמצם / ליניארי / מתעלם מ-', 'להרחיב / רב-ממדי / מדגיש את', 'לתאר / הוליסטי / כולל את', 'לנתח / מפורט / מחמיץ את'],
    correctAnswer: 'לצמצם / ליניארי / מתעלם מ-',
    section: 'verbal',
    difficulty: 'extreme'
  }
];

const quantitativeQuestions = [
  {
    content: 'אם x + 5 = 12, מה ערכו של x?',
    options: ['5', '7', '12', '17'],
    correctAnswer: '7',
    section: 'quantitative',
    difficulty: 'easy'
  },
  {
    content: 'מה שטחו של מלבן שאורכו 8 ורוחבו 5?',
    options: ['13', '26', '40', '45'],
    correctAnswer: '40',
    section: 'quantitative',
    difficulty: 'medium'
  },
  {
    content: 'בכמה דרכים ניתן לסדר 4 ספרי מתמטיקה שונים ו-3 ספרי פיזיקה שונים על מדף כך שכל ספרי המתמטיקה יעמדו יחד וכל ספרי הפיזיקה יעמדו יחד?',
    options: ['4!×3!', '7!', '2×4!×3!', '(7,4)×4!×3!'],
    correctAnswer: '2×4!×3!',
    section: 'quantitative',
    difficulty: 'hard'
  },
  {
    content: 'מהו ערך הביטוי √6+√6+√6+...?',
    options: ['2', '√6', '3', '2/3'],
    correctAnswer: '3',
    section: 'quantitative',
    difficulty: 'very_hard'
  },
  {
    content: 'במסיבה 5 זוגות נשואים. בוחרים באקראי 4 אנשים. מה ההסתברות שנבחר בדיוק זוג נשוי אחד?',
    options: ['(10,4)(5,1)(2,4)/2', '(10,4)5×8×6', '(10,4)5×(8,2)', '(10,4)5×4×3×2'],
    correctAnswer: '(10,4)5×8×6',
    section: 'quantitative',
    difficulty: 'extreme'
  }
];

const englishQuestions = [
  {
    content: 'Choose the correct sentence:',
    options: [
      'She don\'t like coffee.',
      'She doesn\'t likes coffee.',
      'She doesn\'t like coffee.',
      'She don\'t likes coffee.'
    ],
    correctAnswer: 'She doesn\'t like coffee.',
    section: 'english',
    difficulty: 'easy'
  },
  {
    content: 'Select the sentence with the correct punctuation:',
    options: [
      'The cat, which was black, sat on the mat.',
      'The cat which was black sat on the mat.',
      'The cat, which was black sat on the mat.',
      'The cat which was black, sat on the mat.'
    ],
    correctAnswer: 'The cat, which was black, sat on the mat.',
    section: 'english',
    difficulty: 'medium'
  },
  {
    content: 'Choose the correct word to complete the sentence: The committee\'s final report was criticized for its _______ conclusions, which seemed to deliberately avoid addressing the core issues.',
    options: ['trenchant', 'unequivocal', 'perspicacious', 'equivocal'],
    correctAnswer: 'equivocal',
    section: 'english',
    difficulty: 'hard'
  },
  {
    content: 'What is the primary subject of the passage about hermeneutics?',
    options: [
      'The explanation of natural phenomena',
      'The interpretation of religious and classical texts',
      'The analysis of economic systems',
      'The development of scientific methods'
    ],
    correctAnswer: 'The interpretation of religious and classical texts',
    section: 'english',
    difficulty: 'very_hard'
  },
  {
    content: 'According to Gadamer, what constitutes the "fusion of horizons" in hermeneutics?',
    options: [
      'The merging of grammatical and psychological analysis',
      'The complete rejection of the interpreter\'s own perspective',
      'The dialogue and integration between the interpreter\'s historical context and that of the text/artifact',
      'The separation of the text\'s meaning from the author\'s intention'
    ],
    correctAnswer: 'The dialogue and integration between the interpreter\'s historical context and that of the text/artifact',
    section: 'english',
    difficulty: 'extreme'
  }
];

async function main() {
  console.log('Seeding database...');

  // Clear existing questions
  await prisma.question.deleteMany();
  console.log('Cleared existing questions');

  // Add questions to the database
  await prisma.question.createMany({
    data: [...verbalQuestions, ...quantitativeQuestions, ...englishQuestions]
  });

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 