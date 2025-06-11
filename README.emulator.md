# Firestore Emulator Setup

## Quick Start

1. **Start the emulator and development server together:**
   ```bash
   npm run dev:emulated
   ```

2. **Or start them separately:**
   ```bash
   # Terminal 1 - Start Firestore emulator
   npm run emulators

   # Terminal 2 - Start Next.js dev server
   npm run dev
   ```

## Emulator URLs

- **Firestore Emulator UI**: http://localhost:4000
- **Your Next.js App**: http://localhost:3000
- **Firestore Emulator**: http://localhost:8080

## Environment Variables

For emulator development, you can use these dummy values in your `.env.local`:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=demo-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=demo-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=demo-project
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=demo-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abcdef123456
```

## Features

- ✅ Automatic emulator connection in development
- ✅ Firestore UI for data inspection
- ✅ Security rules testing
- ✅ Offline development
- ✅ Data persistence between emulator restarts

## Tips

- The emulator will create a `firebase-debug.log` file
- Data is persisted in the `.firebase/` directory (already gitignored)
- Use the Firestore UI to inspect and modify data during development
- Security rules are automatically applied and can be tested 