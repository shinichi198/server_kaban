import express from "express";
import dotenv from "dotenv";
dotenv.config();
const app = express();
const dbURL = `mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@cluster0.w5ltr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

app.listen(process.env.PORT, () => {
  console.log(`Server is starting at port ${process.env.PORT}`);
});
