import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI

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

    cached.promise = mongoose.connect(MONGODB_URI, options).then((mongoose) => {
      return mongoose
    })
  }

  try {
    cached.conn = await cached.promise
  } catch (e) {
    cached.promise = null
    throw e
  }

  return cached.conn
}

export default dbConnect



// import { MongoClient } from 'mongodb';

// if (!process.env.MONGODB_URI) {
//     throw new Error("Please add your Mongo URI to .env.local");
//   }

// const uri: string = `${process.env.MONGODB_URI}`;
// const options: object = {
//     useUnifiedTopology: true,
//     useNewUrlParser: true,
//   }
// let client: MongoClient;
// let clientPromise: Promise<MongoClient>;

// if (process.env.NODE_ENV === 'development') {

//     if (!global._mongoClientPromise) {
//         client = new MongoClient(uri, options)
//         global._mongoClientPromise = client.connect()
//       }

//       clientPromise = global._mongoClientPromise

// } else {
//     client = new MongoClient(uri, options);
//     clientPromise = client.connect();
// }

// export default clientPromise;





