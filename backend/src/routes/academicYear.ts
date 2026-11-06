import { createAcademicYear } from './../controllers/academicYear';
import express from 'express';
import { authorize, protect } from '../middleware/auth';

const academicYearRouter = express.Router();

academicYearRouter
  .route("/create")
  .post(protect, authorize(["admin"]), createAcademicYear);

export default academicYearRouter;