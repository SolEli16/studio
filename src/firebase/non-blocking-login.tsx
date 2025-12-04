
'use client';
import {
  Auth, // Import Auth type for type hinting
  signInAnonymously,
  // Assume getAuth and app are initialized elsewhere
} from 'firebase/auth';

/** Initiate anonymous sign-in (non-blocking). */
export function initiateAnonymousSignIn(authInstance: Auth): Promise<void> {
  // CRITICAL: Call signInAnonymously directly. Do NOT use 'await signInAnonymously(...)'.
  return signInAnonymously(authInstance).then(() => {
    // Return void promise on success
  }).catch((error) => {
    // Although we don't block, we can still catch and log errors
    console.error("Anonymous sign-in failed:", error);
    // Propagate the error
    throw error;
  });
  // Code continues immediately. Auth state change is handled by onAuthStateChanged listener.
}
