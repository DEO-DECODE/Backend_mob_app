import mongoose from "mongoose";
export const dbConnection = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`Connected to mongoDB ${conn.connection.host}`);
  } catch (error) {
    console.log("Erro in connecting Mogo");
    console.log(error.message);
  }
};
