import express, { Express, NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import connectedDB from "./config/database";
import apiRoutes from "./routes/v1";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

// middlewares
app.use(bodyParser.json());
app.use(cookieParser());

// connect to the database
connectedDB();

// routes
app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to LifeEasier Doctor Management System");
});

app.use("/api/v1", apiRoutes);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    success: false,
    message: "Not Found",
    errorMessages: [
      {
        path: req.originalUrl,
        message: "API Not Found",
      },
    ],
  });

  next();
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
