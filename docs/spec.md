# Psychometry Test Training Web Application - MVP Specification

## Overview
A simple Hebrew web application for psychometry test preparation, focusing on core practice features and essential functionality.

## Language and Localization
- Primary language: Hebrew
- RTL (Right-to-Left) text direction
- Hebrew-specific UI considerations:
  - RTL layout for all components
  - Hebrew font support
  - Hebrew date formatting
  - Hebrew number formatting
  - Proper Hebrew text alignment
  - Hebrew keyboard support

## Core Features

### 1. Basic User Management
- Simple email/password registration and login
- Basic profile information
- Hebrew name support
- Hebrew email validation

### 2. Essential Test Categories
- Verbal Reasoning (מילולי)
- Quantitative Reasoning (כמותי)
- English Language (אנגלית)

### 3. Practice Features
- Timed practice tests
- Basic question bank
- Simple scoring system
- Answer explanations
- Hebrew timer display
- Hebrew progress indicators

### 4. Basic Analytics
- Test completion tracking
- Basic performance metrics
- Simple progress visualization
- Hebrew statistics display

## Question Sources and Management

### Question Generation System
- GPT-4 integration for automated question generation
- Bilingual support (Hebrew/English)
- Question generation process:
  1. System prompts GPT with specific test category and difficulty
  2. GPT generates question with multiple choice answers in Hebrew
  3. GPT provides detailed explanation in Hebrew
  4. Human review and validation before adding to database
  5. Quality control metrics tracking

### Question Categories and GPT Prompts
1. Verbal Reasoning (מילולי)
   - Analogies (אנלוגיות)
   - Sentence completion (השלמת משפטים)
   - Reading comprehension (הבנת הנקרא)
   - Word relationships (יחסים מילוליים)

2. Quantitative Reasoning (כמותי)
   - Basic arithmetic (חשבון בסיסי)
   - Algebra (אלגברה)
   - Geometry (גיאומטריה)
   - Data interpretation (פרשנות נתונים)
   - Number series (סדרות מספרים)

3. English Language (אנגלית)
   - Grammar (דקדוק)
   - Vocabulary (אוצר מילים)
   - Reading comprehension (הבנת הנקרא)
   - Sentence structure (מבנה משפט)

### Question Management
- Admin interface in Hebrew
- RTL form controls
- Hebrew validation messages
- Automated quality checks:
  - Answer uniqueness
  - Explanation clarity
  - Difficulty consistency
  - Cultural sensitivity
  - Hebrew language accuracy

## Technical Architecture

### Frontend
- Next.js 14 with App Router
- Server-side rendering for better SEO
- API routes for backend functionality
- Tailwind CSS with RTL support
- Hebrew font integration
- RTL layout system
- Simple, clean design
- Mobile-responsive layout

### Backend
- Next.js API routes
- SQLite with Prisma ORM
- NextAuth.js for authentication
- Server-side data fetching
- GPT API integration
- Question generation queue system
- Hebrew text processing

### Key Technical Features
- Static page generation for better performance
- Incremental static regeneration for dynamic content
- Built-in API routes
- Server-side authentication
- Optimized image loading
- Local database for easy deployment
- Automated question generation pipeline
- RTL support throughout the application
- Hebrew text rendering optimization

### Database Schema
- Users table (id, email, password_hash, created_at, hebrew_name)
- Tests table (id, category, title_he, description_he)
- Questions table (id, test_id, content_he, correct_answer_he, explanation_he, source, generation_parameters, review_status, quality_score)
- UserResponses table (id, user_id, question_id, answer, is_correct, timestamp)
- UserProgress table (id, user_id, test_id, score, completion_date)

## MVP User Flow
1. User registration/login (Hebrew interface)
2. Select test category (Hebrew categories)
3. Take practice test (Hebrew questions)
4. View results and explanations (Hebrew)
5. Track progress (Hebrew metrics)

## Data Management

### User Data
- Basic profile information in Hebrew
- Test results
- Practice history
- Hebrew preferences

### Content
- GPT-generated question bank in Hebrew
- Basic study materials in Hebrew
- Answer explanations in Hebrew

## Security
- NextAuth.js authentication
- Password hashing
- API route protection
- Environment variables for secrets
- SQL injection prevention through Prisma
- GPT API key security

## Success Metrics
- User registration rate
- Test completion rate
- Basic user satisfaction
- Question quality metrics
- GPT generation success rate
- Hebrew language accuracy
- RTL implementation quality 