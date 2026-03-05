# Advance Frontend Project

This repository contains a modern frontend application built with **Next.js** and **TypeScript**. The codebase is structured to support modular development, maintainability, and scalability. It integrates services like Firebase for authentication and Firestore, and uses Redux for state management.

---

## 🗂 Project Structure Overview

The project is organized into several top-level folders:

- **`src/app/`**: Contains Next.js App Router routes and layouts organized by feature flags like `(auth)`, `(dashboard)`, and `(users)`.
  - Each folder has its own `page.tsx` and optionally `layout.tsx` files.

- **`src/core/`**: Core configuration and provider logic used throughout the app.
  - `config/` holds general configuration files.
  - `firebase/` provides Firebase initialization and helpers.
  - `providers/` includes context providers for Redux, authentication, theming, etc.

- **`src/modules/`**: Main feature modules. Each module typically exposes:
  - `types.ts` for the module-specific TypeScript interfaces.
  - `model/` with business logic and Zustand/Redux stores.
  - `service/` with API wrappers (often Firebase or REST calls).
  - `ui/` components related to the feature.

  Current modules:
  - `admin` – administration tooling like user management.
  - `auth` – authentication flows and account management.
  - `media` – storage/upload helpers.
  - `user` – current user profile and settings.

- **`src/shared/`**: Shared utilities, components, hooks, and constants used across modules.
  - `config/` for shared configuration logic.
  - `constants/`, `hooks/`, `types/`, `ui/`, and `utils/` for reusable code.

- **`public/`**: Static assets served by Next.js.

- **Root files**:
  - `next.config.ts`, `tsconfig.json`, `eslint.config.mjs`, etc. for build and linting configuration.
  - `package.json` declares dependencies like Next, Firebase, React, Redux, etc.

This layered arrangement helps keep concerns separated and makes it easier to navigate and extend the codebase.

---

## ✅ Are you "on track" with the structure?

Yes — the current layout follows a logical, feature-driven architecture. Splitting the app into **core**, **modules**, and **shared** directories aligns well with common best practices. Each feature is encapsulated cleanly, making it easier to maintain and scale. The use of Next.js App Router with folder-based routing keeps routes and their layouts together. Continue following this pattern as you add new functionality: place new business logic inside the appropriate module, and add shared helpers when code needs to be reused.

> 💡 Tip: When adding new pages, mimic the existing folder patterns under `src/app`, and when creating new UI components shared across features, put them under `src/shared/ui`.

---

## 🚀 Getting Started

1. **Install dependencies**
   ```bash
   npm install
   # or yarn
   ```
2. **Configure Firebase**
   - Update `src/core/firebase/firebaseConfig.ts` with your Firebase project credentials.
3. **Run the development server**
   ```bash
   npm run dev
   ```
4. **Build for production**
   ```bash
   npm run build
   ```

---

## 📦 Key Technologies

- **Next.js** (App Router) + **TypeScript**
- **Firebase** for auth, Firestore, and storage
- **Redux** (via `@reduxjs/toolkit`) or Zustand stores in `modules/*/model`
- **Tailwind CSS / PostCSS** (see `postcss.config.mjs` & `styles/index.css`)
- **ESLint** for linting (`eslint.config.mjs`)

---

## 🛠 Adding New Features

1. Create a new module under `src/modules` or add to an existing one.
2. Define types in `types.ts`, services in `service/`, business logic in `model/`, UI in `ui/`.
3. Update routes in `src/app` by creating a new folder with `page.tsx`.
4. Add shared logic/components to `src/shared` if reused.

---

## 📘 Documentation & Conventions

- Follow TypeScript and React best practices.
- Keep modules self-contained and expose only necessary exports.
- Use hooks from `src/shared/hooks` for common patterns like auth listeners.

---

## 😄 Conclusion

You're doing great with the current structure. It's modular, clear, and ready for expansion. Keep documenting new parts in this README as you grow the app!

Feel free to ask if you need help with any specific module or feature. Happy coding! 🎉

