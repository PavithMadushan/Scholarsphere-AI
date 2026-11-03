import express from "express";

const userRoutes = express.Router();

import { login, register } from "../controllers/user.ts";
import { authorize, protect } from "../middleware/auth.ts";

userRoutes.post("/register", protect , authorize(["admin", "teacher"]), register);
userRoutes.post("/login", login);
userRoutes.put("/update/:id", protect , authorize(["admin", "teacher"]), updateUser);

export default userRoutes;