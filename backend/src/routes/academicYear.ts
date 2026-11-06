import { createAcademicYear, deleteAcademicYear, getCurrentAcademicYear, updateAcademicYear } from './../controllers/academicYear';
import express from 'express';
import { authorize, protect } from '../middleware/auth';

const academicYearRouter = express.Router();

academicYearRouter
  .route("/create")
  .post(protect, authorize(["admin"]), createAcademicYear);

academicYearRouter
  .route("/current")
  .get(protect, getCurrentAcademicYear);  

academicYearRouter
  .route("/update/:id")
  .patch(protect, authorize(["admin"]), updateAcademicYear);  

academicYearRouter
  .route("/delete/:id")
  .delete(protect, authorize(["admin"]), deleteAcademicYear);  

export default academicYearRouter;