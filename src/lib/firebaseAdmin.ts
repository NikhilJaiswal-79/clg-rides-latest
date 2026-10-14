import * as admin from 'firebase-admin';

if (!admin.apps.length) {
    const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
    const privateKey = process.env.FIREBASE_PRIVATE_KEY
        ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
        : undefined;

    if (clientEmail && privateKey) {
        try {
            admin.initializeApp({
                credential: admin.credential.cert({
                    projectId,
                    clientEmail,
                    privateKey,
                }),
            });
        } catch (e) {
            console.error("Firebase Admin initialization error:", e);
        }
    } else {
        // Fallback for build phase or environment without full admin credentials
        try {
            admin.initializeApp({
                projectId: projectId || "mock-project",
            });
        } catch {
            // Ignore during build
        }
    }
}

export const dbAdmin = admin.apps.length ? admin.firestore() : (null as any);
export const authAdmin = admin.apps.length ? admin.auth() : (null as any);
