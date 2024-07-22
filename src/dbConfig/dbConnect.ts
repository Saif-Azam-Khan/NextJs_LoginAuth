import mongoose from "mongoose";

export const connect = async () => {
  try {
    mongoose.connect(process.env.MONGO_URL!);
    const db = mongoose.connection;

    db.on("connection", () =>
      console.log(
        "===================DB connection established==================="
      )
    );

    db.on("error", (error: any) =>
      console.error(
        "===================DB connection error===================",
        error?.message
      )
    );
    
  } catch (error: any) {
    console.log("error in dbConnect", error?.message);
  }
};
