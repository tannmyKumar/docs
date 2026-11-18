# Dhankirti Mobile App — Run & Build Notes

Expo customer app (`mobile-app`). Package: `com.dhankirti.customer`.

---

## How to run

### Prerequisites

1. Node.js installed
2. Backend reachable (local on port `4000`, or UAT/prod URL)
3. One of:
   - Android emulator (Android Studio)
   - iOS simulator (Mac only)
   - Physical phone with **Expo Go**

### Setup

```bash
cd mobile-app
npm install
cp .env.example .env
```

### Environment (`.env`)

```env
EXPO_PUBLIC_API_URL=http://localhost:4000
EXPO_PUBLIC_CASHFREE_MODE=sandbox
```

| Target | `EXPO_PUBLIC_API_URL` |
|---|---|
| Android emulator / iOS simulator | `http://localhost:4000` (or `http://10.0.2.2:4000` on some Android emulators) |
| Physical phone (same Wi‑Fi) | `http://<YOUR_PC_LAN_IP>:4000` (e.g. `http://192.168.1.17:4000`) |
| UAT / production API | `https://uat.api.dhankirti.co.in` or production API URL |

Find your PC LAN IP (Windows): `ipconfig` → Wi‑Fi **IPv4 Address**.

### Start Expo

```bash
npm start
```

Then:

- Press **`a`** — Android emulator
- Press **`i`** — iOS simulator (Mac)
- Scan QR — Expo Go on phone

Other scripts:

```bash
npm run android    # start + open Android
npm run ios        # start + open iOS (Mac)
npm run tunnel     # Expo tunnel (when LAN/QR fails)
```

### Emulator vs phone

| | Emulator / simulator | Physical phone (Expo Go) |
|---|---|---|
| Expo URL | `localhost` is fine | Must be LAN IP (`exp://192.168.x.x:8081`), not `127.0.0.1` |
| API URL | `localhost:4000` often works | Use PC LAN IP or deployed API — phone cannot reach your `localhost` |
| Same Wi‑Fi | Not required | Required for LAN mode |

If Expo prints `exp://127.0.0.1:8081` and Expo Go fails, force your LAN IP:

```powershell
# PowerShell — use YOUR ipconfig IPv4
$env:REACT_NATIVE_PACKAGER_HOSTNAME="192.168.1.7"
npx expo start --lan -c
```

Or:

```bash
npx expo start --lan
npm run tunnel
```

### Quick verify

1. Sign in (email/password or OTP)
2. App opens to tabs (Home, Deals, Portfolio, Activity, Profile)
3. Close and reopen — session should persist
4. Sign out → back to login

---

## Build notes

This is an **Expo** app. Store / APK builds use **EAS Build** (`eas.json`).

### Before push (no APK required)

```bash
cd mobile-app
npm run typecheck
npm start   # smoke-test login + main screens
```

### One-time EAS setup

```bash
npm install -g eas-cli
eas login
```

EAS project (already created): `@tan178/dhankirti-mobile`  
Project ID: `3b73daa3-60f4-48bd-9c0f-bea686806a5e`

Because config is dynamic (`app.config.ts`), `eas build:configure` **cannot** auto-write the ID and will fail. Set it manually in `app.config.ts`:

```ts
extra: {
  apiUrl,
  cashfreeMode,
  eas: {
    projectId: "3b73daa3-60f4-48bd-9c0f-bea686806a5e",
  },
},
```

Do **not** keep re-running `eas build:configure` after that.

### Profiles (`eas.json`)

| Profile | Use for | Typical output |
|---|---|---|
| `development` | Custom dev client (native modules) | Internal install |
| `preview` | QA / share with team | Internal (configure APK if needed) |
| `production` | Play Store / App Store | Android **AAB**, iOS IPA |

### Build commands

```bash
# Android preview (QA)
eas build -p android --profile preview

# Android production (Play Store AAB)
eas build -p android --profile production

# iOS preview / production
eas build -p ios --profile preview
eas build -p ios --profile production

# Development client
eas build -p android --profile development

# Local build (needs Android Studio / Xcode)
eas build -p android --profile preview --local
```

For a shareable **APK** (not AAB), set under `preview` in `eas.json`:

```json
"android": {
  "buildType": "apk"
}
```

Then:

```bash
eas build -p android --profile preview
```

Download the artifact from the EAS URL / `eas build:list` and install on a phone.

### Important for installed builds

- Set `EXPO_PUBLIC_API_URL` to a **public** API (UAT/prod). An APK cannot use `localhost`.
- Set `EXPO_PUBLIC_CASHFREE_MODE` to `sandbox` or `production` to match the API.
- Cashfree uses a native SDK — prefer a **development** or **preview** build for payment testing; Expo Go alone may be limited.

### Aadhaar / DigiLocker (KYC)

- Aadhaar verification opens **inside the app** in a full-screen WebView (not the system browser).
- After DigiLocker completes, the backend redirects to `dhankirti://aadhaar-status?verification_id=...` and the app completes KYC automatically.
- **Backend:** `AADHAAR_REDIRECT_URL` must be a **public HTTPS** URL to your API callback (`/api/v1/kyc/callbacks/digilocker`). Use ngrok in local dev — same as Cashfree KYC setup.
- **Web** still uses `AADHAAR_STATUS_URL` (customer-web `/aadhaar-status`). Mobile uses `AADHAAR_MOBILE_STATUS_URL` (default `dhankirti://aadhaar-status`).
- **Local dev skip:** set `SKIP_AADHAAR=true` on backend and `EXPO_PUBLIC_SKIP_AADHAAR=true` in mobile `.env` to bypass DigiLocker in Metro only.

### Submit to stores

```bash
eas submit -p android --profile production
eas submit -p ios --profile production
```
