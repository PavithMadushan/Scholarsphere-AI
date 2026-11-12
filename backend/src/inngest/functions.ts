import { NonRetriableError } from "inngest";
import Class from "../models/class";
import { inngest } from "./index";
import User from "../models/user";

interface GenSettings {
  startTime: string;
  endTime: string;
  period: number;
}

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
    const { classId, academicYearId, settings } = event.data as {
      classId: string;
      academicYearId: string;
      settings: GenSettings;
    };

    const contextData = await step.run("fetch-class-context", async () => {
      // fetch class
      const classData = await Class.findById(classId).populate("subjects");
      if (!classData) throw new NonRetriableError("Class not found");

      // fetch teachers
      const allTeacher = await User.find({ role: "teacher" });

      // filter qualified teachers for class subjects
      const classSubjectsIds = classData.subjects.map((sub) =>
        sub._id.toString(),
      );

      const qualifiedTeachers = allTeacher
        .filter((teacher) => {
          if (!teacher.teacherSubject) return false;
          return teacher.teacherSubject.some((subId) =>
            classSubjectsIds.includes(subId.toString()),
          );
        })
        .map((tea) => ({
          id: tea._id,
          name: tea.name,
          subjects: tea.teacherSubject,
        }));

      const subjectsPayload = classData.subjects.map((sub: any) => ({
        id: sub._id,
        name: sub.name,
        code: sub.code,
      }));

      return {
        className: classData.name,
        subjects: subjectsPayload,
        teachers: qualifiedTeachers,
      };
    });

    return { contextData };
  },
);
