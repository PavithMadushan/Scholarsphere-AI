import express from "express";

const userRoutes = express.Router();

import { login, register } from "../controllers/user.ts";
import { isProtectedKeyword } from "typescript/unstable/ast";
import { authorize, protect } from "../missleware/auth.ts";

userRoutes.post("/register", protect , authorize(["admin", "teacher"]), register);
userRoutes.post("/login", login);

export default userRoutes;