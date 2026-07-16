import { Db, MongoClient } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable in .env.local"
  );
}

interface MongoCache {
  client: MongoClient | null;
  db: Db | null;
  promise: Promise<Db> | null;
}

const globalWithMongo = global as typeof global & {
  mongo?: MongoCache;
};

const cached: MongoCache = globalWithMongo.mongo ?? {
  client: null,
  db: null,
  promise: null,
};

globalWithMongo.mongo = cached;

function resolveDbName(uri: string) {
  const pathname = new URL(uri).pathname.replace(/^\//, "");
  return pathname || "video-game-tracker";
}

export async function connectToDatabase(): Promise<Db> {
  if (cached.db) {
    return cached.db;
  }

  if (!cached.promise) {
    const client = new MongoClient(MONGODB_URI as string);
    cached.promise = client.connect().then((connectedClient) => {
      cached.client = connectedClient;
      return connectedClient.db(resolveDbName(MONGODB_URI as string));
    });
  }

  cached.db = await cached.promise;
  return cached.db;
}
