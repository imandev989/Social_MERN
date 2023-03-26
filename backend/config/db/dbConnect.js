import mongoose from "mongoose";

const dbConnect = () => {
  try {
    mongoose.connect();
  } catch (error) {
    console.error(error);
  }
};

export default dbConnect;
