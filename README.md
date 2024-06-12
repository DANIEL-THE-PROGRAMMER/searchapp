# Project Setup

This project includes a Node.js backend and a Vue.js frontend for a simple user search application.

Prerequisites
Make sure you have the following installed:

Node.js (>=14.x)
npm (>=6.x)
Vue CLI (>=4.x)

# Backend Setup

1.Navigate to the backend directory (or create one if you don't have a separate directory):

```sh
cd backend
```

2.Initialize a new Node.js project and install dependencies:

```sh
npm init -y
npm install express cors
```

3.Run the backend server:

```sh
npx tsc
node dist/server.js
```

## Frontend

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
