import express from "express";
import { createClass } from "../controllers/class";

const classRouter = express.Router();

classRouter.post("/create", createClass);

export default classRouter;
