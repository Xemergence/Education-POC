# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list


# Known Issues
#### Sizing
- XS - 1-2 hours
- S - 1 day
- M - 2-3 days
- L - 1 week
- XL - 2-3 weeks
- XXL - 4+ weeks (unknown)

## General Issues
- [CRITICAL] There is no application state. All components have statically driven content. Yes it looks pretty, but nothing is functional
- Authentication mechanism missing.
- Translations are hardcoded, maybe we need a content delivery service when we expand for translations. Quick solve is to at least have one file or directory with all translations and call it from different areas of the application
- ToS and Privacy Policy missing

## Home Page
Link: '/'
- When clicking "Start Learning for free" we get two pop ups. The "Sign up to get started" and the "Welcome Back"
- "How it works" button doesn't do anything
- "Start your free trial" button doesn't do anything
- All footer links are local links. (#LINKNAME) 
- "Subscribe to our newsletter" doesn't do anything

## Features Page
Link: '/features'
- "Start Learning Now" button doesn't work
- "Start Practicing Now" button doesn't work

## Pricing Page
Link: '/pricing'
- "Start Free Trial" button doesn't work
- Annual/Monthly toggle doesn't work