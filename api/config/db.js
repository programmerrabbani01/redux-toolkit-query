import mongoose from "mongoose";
import { MONGODB_URL } from "../utils/secret.js";

// create mongoDB connection

const mongoDBConnection = async () => {
  try {
    await mongoose.connect(MONGODB_URL);

    console.log(` MongoDB connection established`.bgCyan.black);
  } catch (error) {
    console.log(` MongoDB connection error: ${error.message}`.bgRed.black);
  }
};

// export mongoDB connection

export default mongoDBConnection;
