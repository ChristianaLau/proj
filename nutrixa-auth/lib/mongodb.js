import mongoose from "mongoose";

const connectDB = async () => {
  try {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGODB_URL);
      console.log("db connected");
    }
  } catch (error) {
    console.log(error);
    throw new Error('Database connection failed');
  }
};

export default connectDB;
