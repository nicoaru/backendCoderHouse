import dotenv from 'dotenv'
dotenv.config();

const dbType = process.env.DB_TYPE 
const uriStringMongo = process.env.MONGODB_URISTRING
// admin
const admin = true

export {dbType, uriStringMongo, admin}