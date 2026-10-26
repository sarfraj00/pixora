const envKeys = ["VITE_SERVER_URI","VITE_CLIENT_URI", 'VITE_FIREBASE_APIKEY', 'VITE_FIREBASE_AUTHDOMAIN', 'VITE_FIREBASE_PROJECTID', 'VITE_FIREBASE_STORAGEBUCKET', 'VITE_FIREBASE_MESSAGINGSENDERID', 'VITE_FIREBASE_APPID', 'VITE_FIREBASE_MEASUREMENTID'];

for (let key of envKeys) {
    if (!import.meta.env[key]) {
        console.log('env data is missing ', key)
    }
}

const env = {
    viteServerUri: import.meta.env.VITE_SERVER_URI,
    viteFirebaseApikey: import.meta.env.VITE_FIREBASE_APIKEY,
    viteFirebaseAuthdomain: import.meta.env.VITE_FIREBASE_AUTHDOMAIN,
    viteFirebaseProjectid: import.meta.env.VITE_FIREBASE_PROJECTID,
    viteFirebaseStoragebucket: import.meta.env.VITE_FIREBASE_STORAGEBUCKET,
    viteFirebaseMessagingsenderid: import.meta.env.VITE_FIREBASE_MESSAGINGSENDERID,
    viteFirebaseAppid: import.meta.env.VITE_FIREBASE_APPID,
    viteFirebaseMeasurementid: import.meta.env.VITE_FIREBASE_MEASUREMENTID,
    viteClientUri : import.meta.env.VITE_CLIENT_URI
}

export { env };