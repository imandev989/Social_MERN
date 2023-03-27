import mongoose from "mongoose";

const dbConnect = () => {
  try {
    mongoose.set("strictQuery", false);
    mongoose.connect("mongodb://127.0.0.1:27017/advance_social", {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("Database Connected");
  } catch (error) {
    console.error(error.message);
  }
};

export default dbConnect;
