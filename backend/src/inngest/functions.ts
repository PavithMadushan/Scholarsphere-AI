
import { inngest } from "./index";

export const generateTimeTable = inngest.createFunction(
  {
    id: "Generate-Timetable",
    triggers: [
      {
        event: "generate/timetable",
      },
    ],
  },
  async ({ event, step }) => {

    // Diagnostic: inspect the event received by Inngest
    console.log(
      "Received Inngest Event:",
      JSON.stringify(event, null, 2)
    );

    // Check whether event data exists
    if (!event || !event.data) {
      throw new Error(
        "Inngest received an event without a data object."
      );
    }

    const { classId, academicYearId, settings } = event.data;

    return {
      classId,
      academicYearId,
      settings,
    };
  },
);
