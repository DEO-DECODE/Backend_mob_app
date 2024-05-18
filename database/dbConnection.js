import mongoose from "mongoose";
export const dbConnection = async () => {
  try {
    // const conn = await mongoose.connect(process.env.MONGO_URL,{
    //   dbName:"Hiremebackend"
    // });
    const conn = await mongoose.connect("mongodb://127.0.0.1/Hire_Me");
    console.log(`Connected to mongoDB ${conn.connection.host}`);
  } catch (error) {
    console.log("Error in connecting MongoDB");
    console.log(error.message);
  }
};
