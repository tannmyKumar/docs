# 4. Mobile Dependencies Inventory

Source: `mobile-app/package.json`  
Stack: Expo ~54 · React Native 0.81 · React 19.1

## Runtime dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `expo` | ~54.0.35 | Expo SDK runtime |
| `expo-router` | ~6.0.24 | File-based navigation |
| `react` | 19.1.0 | UI library |
| `react-native` | 0.81.5 | Native UI runtime |
| `@tanstack/react-query` | ^5.101.4 | Server-state cache |
| `react-hook-form` | ^7.84.0 | Forms |
| `@hookform/resolvers` | ^5.7.1 | Zod resolvers for RHF |
| `zod` | ^4.4.3 | Schema validation |
| `dotenv` | ^17.4.2 | Env loading for tooling/config |
| `@expo/vector-icons` | ^15.1.1 | Icon fonts |
| `expo-constants` | ~18.0.13 | App constants / config |
| `expo-dev-client` | ~6.0.21 | Custom dev client |
| `expo-document-picker` | ~14.0.8 | Pick documents |
| `expo-file-system` | ~19.0.23 | File read/write |
| `expo-font` | ~14.0.12 | Custom fonts |
| `expo-image-picker` | ~17.0.11 | Camera/gallery |
| `expo-in-app-updates` | ^0.12.0 | Force/soft app updates |
| `expo-linear-gradient` | ~15.0.8 | Gradients |
| `expo-linking` | ~8.0.12 | Deep links |
| `expo-secure-store` | ~15.0.8 | Secure token storage |
| `expo-sharing` | ~14.0.8 | Share files |
| `expo-splash-screen` | ~31.0.13 | Splash screen |
| `expo-status-bar` | ~3.0.9 | Status bar styling |
| `expo-symbols` | ~1.0.8 | SF Symbols helpers |
| `expo-web-browser` | ~15.0.10 | In-app browser |
| `react-native-gesture-handler` | ~2.28.0 | Gestures |
| `react-native-reanimated` | ~4.1.1 | Animations |
| `react-native-safe-area-context` | ~5.6.0 | Safe areas |
| `react-native-screens` | ~4.16.0 | Native navigation screens |
| `react-native-svg` | 15.12.1 | SVG rendering |
| `react-native-webview` | ^13.17.0 | WebView |
| `react-native-worklets` | 0.5.1 | Worklets (Reanimated) |
| `react-native-cashfree-pg-sdk` | ^2.4.0 | Cashfree payments SDK |
| `cashfree-pg-api-contract` | ^2.1.1 | Cashfree API contracts/types |

## Dev dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `typescript` | ~5.9.2 | TypeScript |
| `@types/react` | ~19.1.0 | React typings |
| `openapi-typescript` | ^7.13.0 | Generate API types |
| `eas-cli` | ^22.6.0 | Expo Application Services CLI |
| `@expo/ngrok` | ^4.1.3 | Tunnel for Expo |
| `sharp` | ^0.35.4 | Image processing (assets/tooling) |
