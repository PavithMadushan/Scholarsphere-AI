import type { Request, Response } from "express";
import { logActivity } from "../utils/activitieslog";
import { inngest } from "../inngest";

// @desc Generate a Timetable using AI
// @route POST /api/timetables/generate
// @access Private/Admin

export const generateTimeTable = async (req: Request, res: Response) => {
  try {
    const { classId, academicYearId, settings } = req.body;

    await inngest.send({
      name: "Generate-Timetable",
      data: {
        classId,
        academicYearId,
        settings,
      },
    });
    const userId = (req as any).user._id;
    await logActivity({
      userId,
      action: `Requested timetable generated for class ID: ${classId}`,
    });

    res
      .status(200)
      .json({ message: "Timetable generation initiated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};
