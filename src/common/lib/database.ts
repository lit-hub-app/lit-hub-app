import { connect } from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI as string
declare global {
  var mongoose: any
}

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  )
}

let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const options = {
      dbName: process.env.DATABASE_NAME,
    }

    cached.promise = connect(MONGODB_URI, options).then((mongoose) => {
      return mongoose
    })
  }

  try {
    cached.conn = await cached.promise
  } catch (error) {
    cached.promise = null
    throw error;
  }

  return cached.conn
}

export default dbConnect






