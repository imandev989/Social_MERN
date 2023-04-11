import express from "express";
import { userLogin, userRegister } from "../controllers/users/UserController.js";

const router = express.Router();

router.post("/api/users/register", userRegister);
router.get("/api/users/login", userLogin);


export default router;
