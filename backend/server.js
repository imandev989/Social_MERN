// const express = require("express");

import express from "express";
import dbConnect from "./config/db/dbConnect.js";
import dotenv from "dotenv";

dotenv.config();
// console.log(process.env);
dbConnect();
const app = express();

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server is running on Port ${PORT}`));
