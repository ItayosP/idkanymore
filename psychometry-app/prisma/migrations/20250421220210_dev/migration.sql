/*
  Warnings:

  - Added the required column `testType` to the `TestAttempt` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_TestAttempt" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "testType" TEXT NOT NULL,
    "section" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "answers" TEXT NOT NULL,
    "timeSpent" INTEGER,
    "completedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "essayContent" TEXT,
    CONSTRAINT "TestAttempt_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_TestAttempt" ("answers", "completedAt", "essayContent", "id", "score", "section", "timeSpent", "userId") SELECT "answers", "completedAt", "essayContent", "id", "score", "section", "timeSpent", "userId" FROM "TestAttempt";
DROP TABLE "TestAttempt";
ALTER TABLE "new_TestAttempt" RENAME TO "TestAttempt";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
