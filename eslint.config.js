import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

export default [
  { ignores: ['dist'] }, // Ignore the dist folder
  {
    files: ['**/*.{js,jsx}'], // Apply to all JS and JSX files
    languageOptions: {
      ecmaVersion: 'latest', // Use the latest ECMAScript version
      globals: globals.browser, // Include browser globals
      parserOptions: {
        ecmaFeatures: { jsx: true }, // Enable JSX support
        sourceType: 'module', // Use ES modules
      },
    },
    settings: {
      react: {
        version: '19.0.0', // Set React version to 19
      },
    },
    plugins: {
      react, // Enable React plugin
      'react-hooks': reactHooks, // Enable React Hooks plugin
      'react-refresh': reactRefresh, // Enable React Refresh plugin
    },
    rules: {
      ...js.configs.recommended.rules, // ESLint recommended rules
      ...react.configs.recommended.rules, // React recommended rules
      ...react.configs['jsx-runtime'].rules, // JSX runtime rules (for React 17+)
      ...reactHooks.configs.recommended.rules, // React Hooks recommended rules
      'react/react-in-jsx-scope': 'off', // Disable React scope rule (not needed for React 17+)
      'react/jsx-uses-react': 'off', // Disable JSX uses React rule (not needed for React 17+)
      'react/jsx-no-target-blank': 'off', // Disable target blank rule (optional)
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true }, // Allow constant exports in React Refresh
      ],
    },
  },
];