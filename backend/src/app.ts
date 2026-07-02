import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";

import { swaggerSpec } from "./config/swagger";
import { env } from "./config/env";

import routes from "./routes/v1";

import { notFound } from "./middlewares/notFound.middleware";
import { errorHandler } from "./middlewares/error.middleware";

const app = express();

// Security Middleware
app.use(helmet());

// CORS
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
];

if (
  env.FRONTEND_URL &&
  !allowedOrigins.includes(env.FRONTEND_URL)
) {
  allowedOrigins.push(env.FRONTEND_URL);
}

app.use(
  cors({
    origin(origin, callback) {
      // Allow requests without Origin (curl, Postman, health checks)
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

// Logging
app.use(morgan("dev"));

// Body Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie Parser
app.use(cookieParser());

// Swagger
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);

// Root Route
app.get("/", (_req, res) => {
  res.send("🚀 Assignment Backend API Running");
});

// Health Check
app.get("/api/v1/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "API is running successfully",
  });
});

// API Routes
app.use("/api/v1", routes);

// 404 Handler
app.use(notFound);

// Global Error Handler
app.use(errorHandler);

export default app;