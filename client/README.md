# Leaf Classification Client Side

## Overview

The **client** folder contains the frontend code for the application, built using React and Vite. This project aims to provide a robust and user-friendly interface for users, leveraging modern JavaScript features and tools.

## Folder Structure

```
client/
├── public/               # Static assets like images and icons
├── src/                  # Main source code for the application
│   ├── components/       # Reusable React components
│   ├── hooks/            # Custom React hooks
│   ├── pages/            # Page components for routing
│   ├── styles/           # Global styles and CSS files
│   ├── App.tsx           # Main application component
│   └── index.tsx         # Entry point for the React application
├── .gitignore            # Files and directories to ignore in version control
├── eslint.config.js      # ESLint configuration for code linting
├── index.html            # HTML template for the application
├── package.json          # Project metadata and dependencies
├── README.md             # Project documentation
├── tsconfig.app.json     # TypeScript configuration for the application
├── tsconfig.json         # Base TypeScript configuration
└── vite.config.ts        # Vite configuration for build and development
```

## Getting Started

To get started with the client application, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/ogeobubu/leaf-classification-app/
   cd client
   ```

2. **Install dependencies**:
   Make sure you have Node.js installed. Then run:
   ```bash
   npm install
   ```

3. **Run the development server**:
   Start the Vite development server with:
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:3000`.

## Scripts

The following scripts are available in the `package.json`:

- `dev`: Runs the application in development mode.
- `build`: Builds the application for production.
- `preview`: Previews the production build locally.

## Dependencies

This project uses several key dependencies:

- **React**: A JavaScript library for building user interfaces.
- **Vite**: A fast build tool and development server.
- **ESLint**: A static code analysis tool for identifying problematic patterns in JavaScript code.
- **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript.

For a complete list of dependencies, refer to the `package.json` file.

## Development Guidelines

- Follow the [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript) for writing JavaScript.
- Use ESLint to maintain code quality. Fix any linting errors before committing changes.
- Write tests for new features and components.

## Contributing

If you'd like to contribute to this project, please fork the repository and submit a pull request. Ensure your code adheres to the project's style guidelines and includes appropriate tests.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.