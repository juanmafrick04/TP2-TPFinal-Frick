const SERVER_PORT=process.env.SERVER_PORT
const DB_NAME=process.env.DB_NAME
const DB_USER=process.env.DB_USER
const DB_PASSWORD=process.env.DB_PASSWORD
const DB_HOST=process.env.DB_HOST
const DB_DIALECT=process.env.DB_DIALECT
const DB_PORT=process.env.DB_PORT
const SECRET=process.env.SECRET
const FIREBASE_PRIVATE_KEY_ID=process.env.FIREBASE_PRIVATE_KEY_ID
const FIREBASE_PRIVATE_KEY=process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')



export{
    SERVER_PORT, 
    DB_NAME,
    DB_USER,
    DB_PASSWORD,
    DB_HOST,
    DB_DIALECT,
    DB_PORT,
    SECRET,
    FIREBASE_PRIVATE_KEY,
    FIREBASE_PRIVATE_KEY_ID

};