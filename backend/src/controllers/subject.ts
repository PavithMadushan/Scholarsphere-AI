import type { Request, Response } from "express";
import { logActivity } from "../utils/activitieslog";
import subject from "../models/subject";

// @desc Create a new Subject
// @route POST/api/subjects
// @access Private/Admin
export const createSubject = async (req: Request, res: Response) => {
  try {
    const { name, code, teacher, isActive } = req.body; // Expecting teacher to be ["ID1", "ID2"]
    const subjectExists = await subject.findOne({ code });
    if (subjectExists) {
      return res.status(400).json({ message: "Subject code already exists" });
    }
    const newSubject = await subject.create({
      name,
      code,
      isActive,
      teacher: Array.isArray(teacher) ? teacher : [],
    });
    if (newSubject) {
      const userId = (req as any).user._id;
      await logActivity({
        userId,
        action: `Created subject: ${newSubject.name}`,
      });
      res.status(201).json(newSubject);
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};
