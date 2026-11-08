import express from "express";
import { authorize, protect } from "../middleware/auth";
import { createSubject } from "../controllers/subject";

const subjectRouter = express.Router();

subjectRouter
  .route("/create")
  .post(protect, authorize(["admin"]), createSubject);

export default subjectRouter;
