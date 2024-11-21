import admin from "firebase-admin";
import serviceAccount from "./path-to-your-firebase-service-account.json";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://<your-database-name>.firebaseio.com",
});

const db = admin.firestore();
export default db;