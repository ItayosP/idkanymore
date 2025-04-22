import { PrismaClient, Question } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

// Define an interface for the structure of questions in the JSON file
interface JsonQuestion {
  id: number | string; // ID might be number or string in JSON
  text: string;
  options: string[];
  correctAnswer: number; // Expecting the index
  explanation?: string;
  // Add other fields if they exist in your JSON (e.g., difficulty, section)
}

// Define the expected structure of the JSON file
interface QuestionsJson {
  [section: string]: JsonQuestion[];
}

async function main() {
  console.log('Seeding database from JSON file...');

  // --- 1. Read the JSON file --- 
  let questionsData: QuestionsJson;
  try {
    // Adjust the path as needed relative to the location of seed.ts
    const jsonPath = path.join(__dirname, '../docs/questions-import-template.json');
    console.log(`Reading questions from: ${jsonPath}`);
    const fileContent = fs.readFileSync(jsonPath, 'utf-8');
    questionsData = JSON.parse(fileContent);
    console.log('Successfully read and parsed JSON file.');
  } catch (error) {
    console.error('Error reading or parsing questions JSON file:', error);
    // If the file doesn't exist or is invalid, exit gracefully
    // Alternatively, you could proceed without seeding questions
    process.exit(1);
  }

  // --- 2. Transform the data --- 
  const questionsForDb: Omit<Question, 'id'>[] = [];
  for (const sectionKey in questionsData) {
    if (Object.prototype.hasOwnProperty.call(questionsData, sectionKey)) {
      const sectionQuestions = questionsData[sectionKey];
      sectionQuestions.forEach((q) => {
        if (!q.text || !q.options || typeof q.correctAnswer !== 'number') {
           console.warn(`Skipping question due to missing data (ID: ${q.id}, Section: ${sectionKey}):`, q);
           return; // Skip if essential data is missing
        }
        questionsForDb.push({
          content: q.text, // Map 'text' to 'content'
          options: JSON.stringify(q.options), // Stringify the options array
          correctAnswer: q.correctAnswer.toString(), // Convert number index to string
          section: sectionKey, // Use the key from the JSON as the section
          difficulty: 'medium', // Assign a default difficulty or get from JSON if available
          explanation: q.explanation || '', // Use explanation if available
          // NOTE: We omit the 'id' field from the JSON 
          //       to let Prisma auto-generate the ID.
        });
      });
    }
  }
  console.log(`Prepared ${questionsForDb.length} questions for database insertion.`);

  // --- 3. Clear existing questions (optional but recommended for seeding) --- 
  console.log('Clearing existing questions...');
  try {
    await prisma.question.deleteMany();
    console.log('Successfully cleared existing questions.');
  } catch (error) {
     console.error("Error clearing questions:", error);
     // Decide if you want to proceed even if clearing fails
  }
 
  // --- 4. Add questions to the database --- 
  if (questionsForDb.length > 0) {
      console.log('Inserting new questions...');
      try {
        await prisma.question.createMany({
          data: questionsForDb,
          // skipDuplicates: true, // Removed: Not supported by SQLite
        });
        console.log(`Successfully inserted ${questionsForDb.length} questions.`);
      } catch (error) {
         console.error("Error inserting questions:", error);
      }
  } else {
      console.log("No valid questions found in JSON to insert.");
  }

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error('Unhandled error in main seed function:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 