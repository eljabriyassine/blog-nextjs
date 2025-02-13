# Next.js Blog Frontend

## Project Description
This is a Next.js frontend application that consumes a backend API for authentication, blog management, and user operations. It provides a user-friendly interface to interact with the backend services.

## Table of Contents
1. [Installation and Setup](#installation-and-setup)
2. [How to Use](#how-to-use)
3. [Project Structure](#project-structure)
4. [Environment Variables](#environment-variables)
5. [Credits](#credits)
6. [License](#license)

## Installation and Setup
### Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (LTS version recommended)
- [Yarn](https://yarnpkg.com/) or npm

### Clone the Repository
```sh
git clone "https://github.com/eljabriyassine/blog-nextjs"
cd blog-nextjs
```

### Install Dependencies
```sh
yarn install  # or npm install
```

### Start the Development Server
```sh
yarn dev  # or npm run dev
```

The application will run at `http://localhost:3000/`.

## How to Use
1. **Authentication**: Users can register and log in via the authentication pages.
2. **Blog Management**:
   - Create a new blog post
   - Edit or delete existing blog posts
3. **User Management**:
   - Search for users
   - Edit user details
   - Delete users
4. **Profile Page**: View user profile details.

## Project Structure
```
nextjs-blog/src
├── app
│   ├── api (Handles API routes for authentication, blogs, and users)
│   ├── auth (Login & Register pages)
│   ├── blogs (Blog-related pages: create, edit, delete)
│   ├── context (Authentication context for global state management)
│   ├── profile (User profile page)
│   ├── users (User management pages)
│   ├── layout.tsx (Application layout)
│   ├── page.tsx (Homepage)
│   ├── globals.css (Global styles)
├── components
│   ├── BlogCard.tsx (Blog post component)
│   ├── navbar.tsx (Navigation bar)
│   ├── theme-provider.tsx (Theme management)
│   ├── ui (Reusable UI components: button, input, card, etc.)
├── lib
│   ├── types.ts (Type definitions)
│   ├── utils.ts (Utility functions)
└── routes.ts (API endpoint definitions)
```

## Environment Variables
Create a `.env` file in the root directory and add:
```
BACKEND_API_URL=""
```
Replace the URL if using a deployed backend.

## Credits
- Developed by [Yassine El Jabri](https://github.com/eljabriyassine)

## License
This project is licensed under the [MIT License](LICENSE).

