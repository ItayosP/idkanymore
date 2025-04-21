import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const verbalQuestions = [
  {
    content: 'מה המשמעות של המילה "משגה"?',
    options: JSON.stringify(['טעות', 'הצלחה', 'התקדמות', 'התחלה']),
    correctAnswer: 0,
    section: 'verbal',
    difficulty: 2
  },
  {
    content: 'מה ההפך של המילה "חסכן"?',
    options: JSON.stringify(['בזבזן', 'עשיר', 'קמצן', 'נדיב']),
    correctAnswer: 0,
    section: 'verbal',
    difficulty: 1
  },
  {
    content: 'מה המשמעות של הביטוי "עלה על שרטון"?',
    options: JSON.stringify(['הצליח', 'נכשל', 'התקדם', 'התחיל']),
    correctAnswer: 1,
    section: 'verbal',
    difficulty: 3
  }
];

const quantitativeQuestions = [
  {
    content: 'מהו הממוצע של המספרים 5, 7, 9?',
    options: JSON.stringify(['6', '7', '8', '9']),
    correctAnswer: 1,
    section: 'quantitative',
    difficulty: 1
  },
  {
    content: 'אם x + 5 = 12, מהו ערכו של x?',
    options: JSON.stringify(['5', '6', '7', '8']),
    correctAnswer: 2,
    section: 'quantitative',
    difficulty: 2
  },
  {
    content: 'מהו שטח המלבן שאורכו 6 ורוחבו 4?',
    options: JSON.stringify(['20', '24', '28', '32']),
    correctAnswer: 1,
    section: 'quantitative',
    difficulty: 2
  }
];

const englishQuestions = [
  {
    content: 'What is the meaning of "benevolent"?',
    options: JSON.stringify(['Kind', 'Angry', 'Sad', 'Tired']),
    correctAnswer: 0,
    section: 'english',
    difficulty: 3
  },
  {
    content: 'Choose the correct sentence:',
    options: JSON.stringify([
      'She go to school',
      'She goes to school',
      'She going to school',
      'She gone to school'
    ]),
    correctAnswer: 1,
    section: 'english',
    difficulty: 2
  },
  {
    content: 'What is the opposite of "generous"?',
    options: JSON.stringify(['Stingy', 'Kind', 'Happy', 'Big']),
    correctAnswer: 0,
    section: 'english',
    difficulty: 2
  }
];

async function main() {
  console.log('Seeding database...');

  // Clear existing questions
  await prisma.question.deleteMany();

  // Add new questions
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