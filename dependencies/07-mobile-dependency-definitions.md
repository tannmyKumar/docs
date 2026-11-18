# 8. Mobile Dependency Definitions

Definitions for every package in `mobile-app/package.json`.

## Core app

**expo** — Managed/prebuild toolkit and SDK modules for React Native apps.

**expo-router** — File-based routing for Expo (screens under `app/`).

**react** — UI library (same conceptual role as web).

**react-native** — Framework for native iOS/Android UI from JavaScript/TypeScript.

**@tanstack/react-query** — Server-state caching for API calls (deals, orders, session).

**react-hook-form** — Performant form state management.

**@hookform/resolvers** — Connects schema validators (Zod) to react-hook-form.

**zod** — Runtime schema validation for forms and payloads.

**dotenv** — Loads `.env` for scripts/config (mobile tooling and local env).

## Expo modules

**@expo/vector-icons** — Icon fonts (Material, Ionicons, etc.) for Expo.

**expo-constants** — Reads app config (`app.json` / EAS) at runtime.

**expo-dev-client** — Custom development build client (beyond Expo Go).

**expo-document-picker** — Native document picker for uploads.

**expo-file-system** — Read/write files on device storage.

**expo-font** — Load custom fonts.

**expo-image-picker** — Pick images from camera or gallery (profile photos, KYC).

**expo-in-app-updates** — Prompt or force users to update the installed app.

**expo-linear-gradient** — Native gradient views.

**expo-linking** — Open URLs and handle deep links.

**expo-secure-store** — Encrypted key-value storage for tokens/secrets on device.

**expo-sharing** — System share sheet for files.

**expo-splash-screen** — Control native splash screen visibility.

**expo-status-bar** — Style the OS status bar.

**expo-symbols** — Helpers for SF Symbols (iOS).

**expo-web-browser** — Opens an in-app browser session (OAuth/SSO flows).

## React Native community libraries

**react-native-gesture-handler** — Native gesture system required by navigation/animations.

**react-native-reanimated** — High-performance animations on the UI thread.

**react-native-safe-area-context** — Safe area insets (notch, home indicator).

**react-native-screens** — Native screen containers for better navigation performance.

**react-native-svg** — Render SVG graphics in React Native.

**react-native-webview** — Embed web content (payment pages, etc.).

**react-native-worklets** — Worklet runtime used with Reanimated.

## Payments

**react-native-cashfree-pg-sdk** — Official Cashfree payment gateway SDK for React Native.

**cashfree-pg-api-contract** — Shared TypeScript contracts/types for Cashfree PG APIs.

## Dev tooling

**typescript** — TypeScript for the mobile codebase.

**@types/react** — React type definitions.

**openapi-typescript** — Generate API types from backend OpenAPI.

**eas-cli** — Expo Application Services CLI (builds, submit, credentials).

**@expo/ngrok** — ngrok integration for Expo tunnel networking in development.

**sharp** — Fast image processing library (asset pipelines / tooling scripts).
