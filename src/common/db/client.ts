import { MongoClient } from 'mongodb';

const { MONGODB_CONNECTION_STRING } = process.env;

const client = new MongoClient(MONGODB_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

client.on('error', err => console.error('Error getting mongo client. ', err));
client.connect();

export { client };
