# Social Sphere - User Management App

## Project Description

This React app, written in TypeScript, serves as the frontend for a user management system, called Social Sphere, with basic authentication features. Leveraging the Material-UI (MUI) framework for styling and Vite as the build tool, the app provides a user-friendly interface for common operations such as signing in, signing up, viewing user profiles, and managing user accounts.

## Features

- **Authentication:**
  - Sign in and sign up pages for user authentication.

- **User Management:**
  - Home page displays all users as clickable cards.
  - Clicking on a user card navigates to the user's page.
  - User own page allows viewing, editing, and deleting account. This is not available on other users' pages.

- **Route Guarding:**
  - Unauthorized access is restricted to the authentication page.
  - If already signed in, going to the authentication page will redirect to the home page.

- **User Not Found Page:**
  - It's fun

## Setup Instructions

Follow these steps to set up and run the React Frontend:

### Dev Mode

1. **Run the Dev Server:**
   ```bash
   npm run dev
  The development server will start, and you can access the app at http://localhost:3000.
   
### Production Mode

1. **Build:**
   ```bash
   npm run build

2. **Start the Preview Server:**
   ```bash
   npm run preview
The preview server will start, and you can access the app at http://localhost:4173.


## Project Structure

  - **src/components**: Contains React components separated by page.
  - **src/_apis**: Contains logic to make API calls.
  - **src/hooks**: Includes all custom hooks.
  - **src/utils**: Contains utility functions and helpers.

## Tools

  - React: JavaScript library for building user interfaces.
  - TypeScript: Adds static typing to JavaScript to improve code quality.
  - Material-UI (MUI): React components for a consistent design language.
  - Vite: Fast build tool for modern web development.
