# Psychometry Project

## Description

This repository contains a web application for psychometric testing. The main application is built with Next.js and resides in the `psychometry-app` directory. It utilizes Prisma for database management, NextAuth for authentication, and potentially integrates with OpenAI.

## Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd psychometry
    ```
2.  **Install root dependencies (if any):**
    ```bash
    npm install
    ```
3.  **Navigate to the application directory:**
    ```bash
    cd psychometry-app
    ```
4.  **Install application dependencies:**
    ```bash
    npm install
    ```
5.  **Set up environment variables:**
    *   Copy the example environment file: `cp .env.example .env`
    *   Fill in the required values in the `.env` file (database URL, NextAuth secrets, OpenAI API key, etc.).
6.  **Set up the database:**
    *   Run Prisma migrations: `npx prisma migrate dev`
    *   (Optional) Seed the database: `npx prisma db seed` (Ensure `ts-node` is installed globally or as a dev dependency if needed for seeding).

## Usage

1.  **Navigate to the application directory:**
    ```bash
    cd psychometry-app
    ```
2.  **Start the development server:**
    ```bash
    npm run dev
    ```
3.  Open your browser and navigate to `http://localhost:3000` (or the specified port).

## Contributing

Guidelines for contributing to the project.

## License

Information about the project license.
