import { initializeApp } from "firebase/app";

import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { env } from "../config/env";

const firebaseConfig = {
    apiKey: env.viteFirebaseApikey,
    authDomain: env.viteFirebaseAuthdomain,
    projectId: env.viteFirebaseProjectid,
    storageBucket: env.viteFirebaseStoragebucket,
    messagingSenderId: env.viteFirebaseMessagingsenderid,
    appId: env.viteFirebaseAppid,
    measurementId: env.viteFirebaseMeasurementid
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
const provider = new GoogleAuthProvider();

const googleAuth = async () => {
    try {
        let data = await signInWithPopup(auth, provider);
        return data.user;
    }
    catch (err) {
        console.log('firebase configuration error', err);
    }
}

export { googleAuth }