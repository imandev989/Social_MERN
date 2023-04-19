import express from "express";
import { userLogin, userRegister, getUsers } from "../controllers/users/UserController.js";

const router = express.Router();

router.post("/api/users/register", userRegister);
router.get("/api/users/login", userLogin);
router.get("/api/users", getUsers);



export default router;
