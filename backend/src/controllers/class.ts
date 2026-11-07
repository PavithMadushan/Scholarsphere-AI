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

// @desc    Update Class
// @route   PUT /api/classes/:id
// @access  Private/Admin
export const updateClass = async (req: Request, res: Response) => {
  try {
    const classId = req.params.id;
    const { name, academicYear } = req.body;

    const existingClass = await Class.findOne({
      _id: { $ne: classId },
    });
    if (existingClass) {
      const updatedClass = await Class.findByIdAndUpdate(classId, req.body, {
        new: true,
        runValidators: true,
      });
      if (!updatedClass) {
        return res.status(404).json({ message: "Class not found" });
      }
      await logActivity({
        userId: (req as any).user.id,
        action: `Updated class: ${updatedClass.name}`,
      });
      return res.status(200).json(updatedClass);
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// @desc    Delete Class
// @route   DELETE /api/classes/:id
// @access  Private/Admin
export const deleteClass = async (req: Request, res: Response) => {
  try {
    const deletedClass = await Class.findByIdAndDelete(req.params.id);
    const userId = (req as any).user._id;
    await logActivity({
      userId,
      action: `Deleted class: ${deletedClass?.name}`,
    });
    if (!deletedClass) {
      return res.status(404).json({ message: "Class not found" });
    }
    res.json({ message: "Class removed" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
