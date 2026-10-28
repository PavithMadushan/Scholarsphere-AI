import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db";
import userRoutes from "./routes/user";
import LogsRouter from "./routes/activitieslog";

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//credentials:true allows cookies to be sent with requests
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);

//health check route
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ status: "Ok", message: "Server is healthy" });
});

//import user routes
app.use("/api/users", userRoutes);
app.use("/api/activities", LogsRouter);

//global error handler middleware
app.use((err: Error, req: Request, res: Response, next: Function) => {
  console.error(err.stack);
  res.status(500).json({ status: "Error", message: err.message });
});

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server is running on PORT 3000");
  });
});
