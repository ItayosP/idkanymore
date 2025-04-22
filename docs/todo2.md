# TODO List based on spec2.md

This list outlines the development tasks required to implement the full psychometric test simulation described in `docs/spec2.md`.

## General Features

- [X] Implement a "Full Test" mode that includes Verbal, Quantitative, and English sections.
- [X] Implement a standalone "Essay Task" (מטלת כתיבה) mode.
- [X] In the "Full Test" mode, add an option for the user to choose whether the essay task is performed before or after the multiple-choice sections.

## Essay Task (מטלת כתיבה)

- [X] Create a dedicated UI for the essay task.
- [X] Display the specific essay prompt from `spec2.md` (or similar prompts).
- [X] Provide a text area for the user to write their essay.
- [X] Implement a 30-minute timer specifically for the essay task.
- [X] Implement functionality to save the user's essay text.

## Verbal Reasoning Section (חשיבה מילולית)

- [ ] **Data:** Store the verbal reasoning questions, options, and correct answers from `spec2.md` (or similar) in the database/data source.
    - [ ] Analogies (שאלות 1-6)
    - [ ] Sentence Completions (implied in 7-9 logic)
    - [ ] Logic/Inference Questions (שאלות 7-9)
    - [ ] Short Reading Comprehension Passages & Questions (שאלות 10-17)
    - [ ] Long Reading Comprehension Passage & Questions (שאלות 18-23)
- [ ] **UI:** Display verbal reasoning questions one by one with multiple-choice options.
- [ ] Implement the 20-minute timer for this section.
- [ ] Implement logic to track user answers for the verbal section.
- [ ] Implement scoring logic based on correct answers for the verbal section.

## Quantitative Reasoning Section (חשיבה כמותית) - *Content Not in spec2.md*

- [ ] **Spec:** Define the structure and content for the Quantitative Reasoning section (number of questions, types, difficulty).
- [ ] **Data:** Create and store Quantitative Reasoning questions, options, and correct answers.
- [ ] **UI:** Adapt the test interface to display quantitative questions (potentially requiring math formatting).
- [ ] Implement a 20-minute timer for this section.
- [ ] Implement logic to track user answers for the quantitative section.
- [ ] Implement scoring logic based on correct answers for the quantitative section.

## English Language Section - *Content Not in spec2.md*

- [ ] **Spec:** Define the structure and content for the English Language section (number of questions, types like sentence completion, restatements, reading comprehension).
- [ ] **Data:** Create and store English Language questions, options, and correct answers.
- [ ] **UI:** Adapt the test interface to display English questions.
- [ ] Implement a 20-minute timer for this section.
- [ ] Implement logic to track user answers for the English section.
- [ ] Implement scoring logic based on correct answers for the English section.

## Test Interface & Flow

- [ ] Modify the main `TestInterface` component to handle the different modes (Full Test, Essay, Section-Specific).
- [ ] Implement the logic for selecting the essay position (start/end) in Full Test mode.
- [ ] Ensure smooth transitions between different sections/tasks in the Full Test mode.
- [ ] Handle overall timing for the Full Test (sum of section times + essay time).
- [ ] Update the completion screen to potentially show scores for each section and maybe the submitted essay in the Full Test mode.

## Backend & Data

- [ ] Update database schema (`TestAttempt` model?) to accommodate saving essay content.
- [ ] Update backend API (`/api/test/complete` or a new endpoint) to handle submission of full tests, potentially including essay data.
- [ ] Ensure question fetching logic (`/api/questions`) can retrieve questions for all sections required for a Full Test.

## Refinement

- [ ] Review and potentially add explanations for correct answers (as mentioned in `spec2.md` structure but not explicitly listed as a requirement).
- [ ] Consider adding difficulty levels to questions if not already present.
- [ ] Format the content in `spec2.md` using more markdown structure (headings, lists) for better readability (Optional doc update).
- [ ] Remove the initial English requirement lines from `spec2.md` if they are now redundant (Optional doc update).
