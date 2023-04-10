// const express = require("express");

import express from "express";
import dbConnect from "./config/db/dbConnect.js";
import dotenv from "dotenv";
import userRoute from "./routes/userRoute.js";
import { errorHandler, notFound } from "./middleware/error/errorHandler.js";

dotenv.config();
// console.log(process.env);
dbConnect();
const app = express();
app.use(express.json());
app.use(userRoute);

//error handler
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server is running on Port ${PORT}`));
