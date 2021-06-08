import admin from 'firebase-admin';
import firebase from 'firebase';
import 'firebase/auth';

const {
  FIREBASE_PROJECT_ID,
  FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_APP_ID,
  FIREBASE_ADMIN_PRIVATE_KEY,
  FIREBASE_ADMIN_CLIENT_EMAIL,
} = process.env;

const getAdminInstance = () => {
  try {
    if (admin.apps.length < 1) {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId: FIREBASE_PROJECT_ID,
          privateKey: FIREBASE_ADMIN_PRIVATE_KEY,
          clientEmail: FIREBASE_ADMIN_CLIENT_EMAIL,
        }),
        databaseURL: `https://${process.env.FIREBASE_PROJECT_ID}.firebaseio.com`,
      });
    }

    return admin;
  }
  catch (ex) {
    console.error('Error getting firebase admin instance', ex);
    throw ex;
  }
}

const getInstance = () => {
  try {
    if (firebase.apps.length < 1) {
      const firebaseConfig = {
        apiKey: FIREBASE_API_KEY,
        authDomain: FIREBASE_AUTH_DOMAIN,
        projectId: FIREBASE_PROJECT_ID,
        storageBucket: FIREBASE_STORAGE_BUCKET,
        messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
        appId: FIREBASE_APP_ID,
      };
  
      firebase.initializeApp(firebaseConfig);
    }

    return firebase;
  } catch (ex) {
    console.error('Error getting firebase instance', ex);
    throw ex;
  }
}

export { getAdminInstance, getInstance };
