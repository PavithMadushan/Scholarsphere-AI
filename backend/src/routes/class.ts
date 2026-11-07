import express from "express";
import { createClass, deleteClass, updateClass } from "../controllers/class";
import { protect, authorize } from "../middleware/auth";

const classRouter = express.Router();

classRouter.post("/create", protect, authorize(["admin"]), createClass);
classRouter.patch("/update/:id", protect, authorize(["admin"]), updateClass);
classRouter.delete("/delete/:id", protect, authorize(["admin"]), deleteClass);

export default classRouter;
