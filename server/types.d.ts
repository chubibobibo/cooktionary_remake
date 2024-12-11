declare namespace NodeJS {
  interface ProcessEnv {
    MONGO_URI: string;
    STORE_SECRET: string; // Declare STORE_SECRET as always defined
    SESSION_SECRET: string;
  }
}
