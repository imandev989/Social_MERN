import express from "express";
import { userRegister } from "../controllers/users/UserController.js";

const router = express.Router();

router.post("/api/users/register", userRegister);

export default router;
