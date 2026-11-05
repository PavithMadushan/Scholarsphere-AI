import express from "express";

const userRoutes = express.Router();

import { deleteUser, login, register, updateUser } from "../controllers/user.ts";
import { authorize, protect } from "../middleware/auth.ts";

userRoutes.post("/register", protect , authorize(["admin", "teacher"]), register);
userRoutes.post("/login", login);
userRoutes.put("/update/:id", protect, authorize(["admin", "teacher"]), updateUser);
userRoutes.delete("/delete/:id", protect, authorize(["admin", "teacher"]), deleteUser)

export default userRoutes;