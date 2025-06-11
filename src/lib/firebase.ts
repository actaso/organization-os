import { initializeApp } from 'firebase/app'
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firestore
export const db = getFirestore(app)

// Connect to Firestore emulator in development
let emulatorConnected = false
if (process.env.NODE_ENV === 'development' && !emulatorConnected) {
  try {
    connectFirestoreEmulator(db, 'localhost', 8080)
    emulatorConnected = true
    console.log('🔥 Connected to Firestore emulator')
  } catch (error) {
    console.warn('Failed to connect to Firestore emulator:', error)
  }
}

export default app 