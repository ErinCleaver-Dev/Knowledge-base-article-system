const { initializeApp } = require('firebase-admin/app');

const serviceAccount = require("./serviceAccountKey.json");

initializeApp({
    credential: admin.credential.cert(serviceAccount)
});