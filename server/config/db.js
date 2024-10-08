import mongoose from "mongoose";
const connectDB = async () => {
  try {
    mongoose.set("strictQuery", false);
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`Database Connected: ${conn.connection.host}`);
    // console.log(`Database name: ${conn.connection.name}`);
    

  } catch (error) {
    console.log(error);
  }
};



export default connectDB;
