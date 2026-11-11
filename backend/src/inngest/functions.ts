import { inngest } from "./index";

export const generateTimeTable = inngest.createFunction(
  {
    id: "process-task",
    triggers: [{ event: "test/hello.world" }],
  },
  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "1s");

    return {
      message: `Hello ${event.data.email}!`,
    };
  },
);