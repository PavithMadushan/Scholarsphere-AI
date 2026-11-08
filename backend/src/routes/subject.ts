import express from "express";
import { authorize, protect } from "../middleware/auth";
import { createSubject, getAllSubjects } from "../controllers/subject";

const subjectRouter = express.Router();

subjectRouter
  .route("/create")
  .post(protect, authorize(["admin"]), createSubject);

subjectRouter
  .route("/")
  .get(protect, authorize(["admin", "teacher"]), getAllSubjects);

export default subjectRouter;
