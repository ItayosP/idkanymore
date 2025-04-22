import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/authOptions';
import { Question } from '@/types'; // Assuming you have a types file

// Temporary function to get all questions - Replace with DB query if questions are in DB
// This replicates the logic from /api/questions/route.ts for now
async function getAllQuestions(): Promise<Record<string, Question[]>> {
  // In a real app, fetch these from your database
  // For now, copy the hardcoded questions from /api/questions/route.ts
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

  return {
    verbal: verbalQuestions,
    quantitative: quantitativeQuestions,
    english: englishQuestions,
  };
}

async function getQuestionsByIds(section: string, questionIds: number[]): Promise<Question[]> {
  // --- IMPORTANT --- 
  // This part needs to be implemented based on how questions are actually stored.
  // If hardcoded (like in /api/questions), filter them here.
  // If in DB, query the DB.
  
  // Example using hardcoded questions:
  const allQuestions = await getAllQuestions(); // Fetch all hardcoded q's
  const sectionQuestions = allQuestions[section] || [];
  
  // Filter the questions for the specific IDs needed for this attempt
  const relevantQuestions = sectionQuestions.filter(q => questionIds.includes(q.id));
  
  // Ensure the order matches the answers if necessary, or handle potential missing questions
  const questionMap = new Map(relevantQuestions.map(q => [q.id, q]));
  return questionIds.map(id => questionMap.get(id)).filter(q => q !== undefined) as Question[];
}

// --- Define types matching frontend expectations ---
interface AnswerDetail {
  questionId: string;
  questionText?: string; 
  options?: string[];     
  selectedAnswerIndex: number;
  correctAnswerIndex?: number; // Make optional as it might not be readily available
  isCorrect?: boolean; // Make optional as it might not be readily available
}

interface SectionResult {
  sectionType: string; 
  isPilot: boolean;
  score?: number; 
  answers?: AnswerDetail[]; 
  essayContent?: string; 
}

interface TestAttemptResult {
  id: string;
  completedAt: string;
  overallScore?: number; 
  sections: SectionResult[];
}
// ---------------------------------------------

// --- Updated getQuestionDetails to use hardcoded data ---
async function getQuestionDetails(questionId: string, sectionType?: string): Promise<Question | null> {
    console.log(`Fetching details for question ID: ${questionId} (type: ${typeof questionId})`);
    
    // First try to find the question directly in the database
    try {
        const question = await prisma.question.findUnique({
            where: { id: questionId }
        });

        if (question) {
            return {
                id: question.id,
                text: question.content,
                options: typeof question.options === 'string' ? JSON.parse(question.options) : question.options,
                correctAnswer: question.correctAnswer,
                explanation: '' // Add explanation if available in the database
            };
        }
    } catch (error) {
        console.warn(`Error fetching question from database: ${error}`);
    }

    // If not found in database and we have a section type, try to find it in the hardcoded questions
    if (sectionType) {
        const allQuestionsData = await getAllQuestions();
        const sectionQuestions = allQuestionsData[sectionType];

        if (!sectionQuestions) {
            console.warn(`No hardcoded questions found for section type: ${sectionType}`);
            return null;
        }

        // Try to find the question by numeric ID
        const numericId = parseInt(questionId, 10);
        if (!isNaN(numericId)) {
            const foundQuestion = sectionQuestions.find(q => q.id === numericId);
            if (foundQuestion) {
                console.log(`Found details for question ID: ${questionId} in section ${sectionType}`);
                return foundQuestion;
            }
        }
    }

    // If not found in database or hardcoded questions, try the old format parsing
    const parts = questionId.split('-');
    if (parts.length >= 3) {
        const sectionType = parts[0]; // e.g., 'quantitative'
        const originalId = parseInt(parts[2], 10); // Get the last part as number

        if (isNaN(originalId)) {
            console.warn(`Could not parse original ID number from: ${questionId}`);
            return null;
        }

        const allQuestionsData = await getAllQuestions();
        const sectionQuestions = allQuestionsData[sectionType];

        if (!sectionQuestions) {
            console.warn(`No hardcoded questions found for section type: ${sectionType}`);
            return null;
        }

        // Find the question in the specific section array using the parsed original numeric ID
        const foundQuestion = sectionQuestions.find(q => q.id === originalId);

        if (!foundQuestion) {
            console.warn(`Question details not found for type ${sectionType} and original ID ${originalId}`);
            return null;
        }
        console.log(`Found details for question ID: ${questionId} (Original ID: ${originalId})`);
        return foundQuestion;
    }

    console.warn(`Invalid question ID format: ${questionId}`);
    return null;
}
// -------------------------------------------------------

export async function GET(
  request: Request,
  { params }: { params: { attemptId: string } }
) {
  try {
    console.log(`Results API: Received request for attemptId: ${params.attemptId}`);
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }
    const userId = session.user.id;

    const testAttempt = await prisma.testAttempt.findUnique({
      where: {
        id: params.attemptId,
        userId: userId, // Ensure the user owns this attempt
      },
    });

    if (!testAttempt) {
      return new NextResponse(JSON.stringify({ error: 'Test attempt not found or unauthorized' }), { status: 404 });
    }

    // --- Parse and Structure the Data --- 
    let parsedSectionsData: any[] = [];
    // Fetch essay content directly from the attempt record
    const essayContentFromDb = testAttempt.essayContent; // <<< Assuming schema was updated with essayContent field

    try {
        if (testAttempt.answers) {
            if (testAttempt.section === 'full_test') { 
                parsedSectionsData = JSON.parse(testAttempt.answers);
            } else {
                // Handle single section attempts
                const answers = JSON.parse(testAttempt.answers);
                console.log('Parsed answers from DB:', answers);
                
                // Calculate score based on correct answers
                const correctAnswers = answers.filter((ans: any) => ans.isCorrect).length;
                const score = (correctAnswers / answers.length) * 100;
                
                parsedSectionsData = [{
                    type: testAttempt.section,
                    isPilot: false,
                    score: score,
                    answers: answers.map((ans: any) => ({
                        ...ans,
                        questionId: `${testAttempt.section}-1-${ans.questionId}`,
                    }))
                }];

                console.log('Formatted section data:', parsedSectionsData);
            }
        }
    } catch (e) {
      console.error("Error parsing test attempt answers:", e);
      return new NextResponse(JSON.stringify({ error: 'Failed to parse result data' }), { status: 500 });
    }

    // Map parsed data to the structure expected by the frontend
    const formattedSections: SectionResult[] = await Promise.all(
        (parsedSectionsData || []).map(async (sectionData): Promise<SectionResult> => {
        const sectionResult: SectionResult = {
            sectionType: sectionData.type,
            isPilot: sectionData.isPilot,
            score: sectionData.score,
            answers: [],
            essayContent: undefined,
        };

        if (sectionData.type === 'essay') {
             sectionResult.essayContent = essayContentFromDb ?? "(שגיאה בטעינת תוכן חיבור)"; 
        } else if (Array.isArray(sectionData.answers)) {
            // Process all answers in parallel for better performance
            const answersPromises = sectionData.answers.map(async (ans: any): Promise<AnswerDetail> => {
                const questionDetails = await getQuestionDetails(ans.questionId, sectionData.type);
                
                // Calculate isCorrect by comparing selected answer with correct answer
                const isCorrect = ans.selectedAnswerIndex === questionDetails?.correctAnswer;
                
                return {
                    questionId: ans.questionId,
                    selectedAnswerIndex: ans.selectedAnswerIndex,
                    questionText: questionDetails?.text ?? `טקסט שאלה חסר (ID: ${ans.questionId})`,
                    options: questionDetails?.options ?? [],
                    correctAnswerIndex: questionDetails?.correctAnswer,
                    isCorrect: isCorrect
                };
            });
            
            sectionResult.answers = await Promise.all(answersPromises);
            console.log('Processed answers:', sectionResult.answers);
        }
        return sectionResult;
      })
    );
    // --------------------------------------

    // Construct the final response object
    const responseData: TestAttemptResult = {
      id: testAttempt.id,
      completedAt: testAttempt.completedAt.toISOString(),
      sections: formattedSections,
      // TODO: Add overallScore if calculated during completion/saved
      // overallScore: testAttempt.overallScore 
    };

    console.log(`Results API: Returning structured data for attemptId: ${params.attemptId}`);
    return NextResponse.json(responseData);

  } catch (error) {
    console.error('Results API: Server error:', error);
    return new NextResponse(
      JSON.stringify({ error: 'שגיאת שרת פנימית' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  } finally {
    await prisma.$disconnect();
  }
} 