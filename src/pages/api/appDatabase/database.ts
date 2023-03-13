import { MongoClient } from 'mongodb';

if (!process.env.MONGODB_URI) {
    throw new Error("Please add your Mongo URI to .env.local");
  }

const uri: string = `${process.env.MONGODB_URI}`;
const options: object = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  }
let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {

    if (!global._mongoClientPromise) {
        client = new MongoClient(uri, options)
        global._mongoClientPromise = client.connect()
      }
      
      clientPromise = global._mongoClientPromise

} else {
    client = new MongoClient(uri);
    clientPromise = client.connect();
}

export default clientPromise;




