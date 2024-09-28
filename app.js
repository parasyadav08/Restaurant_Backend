import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { dbConnection } from "./database/dbConnection.js";
import { errorMiddleware } from "./error/error.js";
import reservationRouter from './routes/reservationRoute.js';

const app = express();
dotenv.config({ path: "./config/config.env" });

// Remove trailing slash from FRONTEND_URL if present
const frontendURL = process.env.FRONTEND_URL?.replace(/\/$/, '');

// Configure CORS with correct origin handling
app.use(cors({
    origin: [frontendURL, "http://localhost:3000", "http://localhost:4000"], // Ensure correct frontend URL
    credentials: true,  // Allow credentials like cookies
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"], // Include OPTIONS
    allowedHeaders: ["Content-Type", "Authorization"], // Allow necessary headers
}));

// Middleware to parse incoming JSON and URL-encoded requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Reservation route
app.use('/api/v1/reservation', reservationRouter);

// Database connection
dbConnection();

// Error middleware
app.use(errorMiddleware);

export default app;
