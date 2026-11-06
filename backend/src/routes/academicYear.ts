import { createAcademicYear, getCurrentAcademicYear } from './../controllers/academicYear';
import express from 'express';
import { authorize, protect } from '../middleware/auth';

const academicYearRouter = express.Router();

academicYearRouter
  .route("/create")
  .post(protect, authorize(["admin"]), createAcademicYear);

academicYearRouter
  .route("/current")
  .get(protect, getCurrentAcademicYear);  

export default academicYearRouter;