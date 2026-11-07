import type { Request, Response } from "express";
import Class from "../models/class";
import AcademicYear from "../models/academicYear";
import { logActivity } from "../utils/activitieslog";

// @desc Update Create a new Class
// @route Post /api/classes
// @access Private/Admin

export const createClass = async (req: Request, res: Response) => {
  try {
    const { name, academicYear, classTeacher, capacity } = req.body;

    const existingClass = await Class.findOne({ name, academicYear });
    if (existingClass) {
      return res.status(400).json({
        message:
          "Class with this name already exists for the specified academic year.",
      });
    }

    const newClass = await Class.create({
      name,
      academicYear,
      classTeacher,
      capacity,
    });
    await logActivity({
      userId: (req as any).user.id,
      action: `Created new class: ${newClass.name}`,
    });
    res.status(201).json(newClass);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};
