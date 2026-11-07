import express from "express";
import { createClass, updateClass } from "../controllers/class";
import { protect, authorize } from "../middleware/auth";

const classRouter = express.Router();

classRouter.post("/create", protect, authorize(["admin"]), createClass);
classRouter.patch("/update/:id", protect, authorize(["admin"]), updateClass);

export default classRouter;
