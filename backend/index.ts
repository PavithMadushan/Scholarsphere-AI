import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import dotenv from "dotenv";
import cors from "cors"

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

app.use(
    cors({
        origin:process.env.CLIENT_URL,
        credentials:true,
    })
);

app.get("/", (req:Request, res:Response)=>{
  res.status(200).json({status:"Ok", message:"Server is healthy"})
});

app.listen(PORT, () => {
  console.log("Server is running on PORT 3000");
});
