import dotenv from 'dotenv'
dotenv.config();
import serviceAccountFirebase from "../proyecto-backend-coderhouse-firebase-adminsdk-xgmd0-f96ad5aae9.json" assert {type: 'json'};;

const dbType = process.env.DB_TYPE 
const uriStringMongo = process.env.MONGODB_URISTRING
// admin
const admin = true

export {dbType, uriStringMongo, admin, serviceAccountFirebase}