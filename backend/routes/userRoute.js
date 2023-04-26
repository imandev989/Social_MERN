import express from "express";
import {
  userLogin,
  userRegister,
  getUsers,
  deleteUser,
  detailUser,
} from "../controllers/users/UserController.js";
import { verifyToken } from "../middleware/token/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken/RefreshToken.js";

const router = express.Router();

router.get("/token", refreshToken);

router.post("/api/users/register", userRegister);
router.get("/api/users/login", userLogin);
router.get("/api/users", verifyToken, getUsers);
router.delete("/api/users/:id", verifyToken, deleteUser);
router.get("/api/users/:id", verifyToken, detailUser);

export default router;
