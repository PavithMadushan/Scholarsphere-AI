
import type { Response } from "express";
import type { AuthRequest } from "../middleware/auth.ts";
import { logActivity } from "../utils/activitieslog.ts";
import { inngest } from "../inngest";

// @desc Generate a Timetable using AI
// @route POST /api/timetables/generate
// @access Private/Admin

export const generateTimeTable = async (
  req: AuthRequest,
  res: Response
) => {  
  try {
    const { classId, academicYearId, settings } = req.body;    

    // Send timetable generation event to Inngest
    await inngest.send({
      name: "generate/timetable",
      data: {
        classId,
        academicYearId,
        settings,
      },
    });

    // Get the currently authenticated user's ID
    const userId = req.user?._id;

    if (userId) {
      await logActivity({
        userId: userId.toString(),
        action: `Requested timetable generation for class ID: ${classId}`,
      });
    }

    return res.status(200).json({
      message: "Timetable generation initiated successfully",
    });

  } catch (error) {
    console.error("Generate Timetable Error:", error);

    return res.status(500).json({
      message: "Server Error",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};
