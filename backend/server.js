// const express = require("express");

import express from "express";

const app = express();

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server is running on Port ${PORT}`));
