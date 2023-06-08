/* eslint no-console: 0 */
import { MongoClient, ServerApiVersion } from 'mongodb';

const { MONGO_CONN, MONGO_CRED_PATH: credentials } = process.env;

if (!MONGO_CONN || !credentials) {
  throw new Error('MongoDB connection info is missing.');
}

const client = new MongoClient(MONGO_CONN, {
  sslKey: credentials,
  sslCert: credentials,
  serverApi: ServerApiVersion.v1,
});

export const connect = async () => {
  try {
    await client.connect();
    console.log('Connected to MongoDB successfully.');
  } catch (err) {
    console.error('MongoDB connection error!', err);
    client.close();
    process.exit(1);
  }
};

export const clientConn = client;
