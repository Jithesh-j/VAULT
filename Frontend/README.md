# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.



#  VAULT AI

VAULT AI is a secure, AI-powered document management platform designed to provide users with a "Digital Vault" for their most sensitive information. Unlike traditional storage, VAULT AI leverages machine learning to categorize, search, and interact with documents using natural language.

## Features
1. Secure Document Storage: Encrypted storage for sensitive files using PostgreSQL and secure microservices.

2. AI-Powered Insights: Integrated with Spring AI (or your specific LLM implementation) to summarize documents and answer questions about your stored data.

3. Intelligent Search: Move beyond filename searches; find documents based on their actual content and context.

4. Modern Dashboard: A responsive, sleek interface built with React for seamless document uploading and management.

## Security
Security is the core of VAULT AI. We implement:

1. JWT-based authentication.

2. Strict CORS policies and header protection.
