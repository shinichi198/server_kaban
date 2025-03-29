import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRouter from "./src/routers/user";
import cors from "cors";
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

const dbURL = `mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@cluster0.w5ltr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
app.use("/auth", userRouter);
const connectDB = async () => {
  try {
    await mongoose.connect(dbURL);
    console.log(`Connect to db successfully`);
  } catch (error) {
    console.log(`Can not connect to db${error}`);
  }
};
connectDB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server is starting at port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
