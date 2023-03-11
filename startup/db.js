import mongoose from "mongoose";
import config from "config";

const dbInitialization = (params) => {
  const dbName = process.env.MONGODB_URI || config.get("db");

  mongoose.connect(dbName, { useNewUrlParser: true }).then(() => {
    console.log(
      "DB connected: ",
      process.env.NODE_ENV,
      config.get("db")
    );
  });
};

export default dbInitialization;
