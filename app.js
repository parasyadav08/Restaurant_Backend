import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { dbConnection } from "./database/dbConnection.js";
import { errorMiddleware } from "./error/error.js";
import reservationRouter from './routes/reservationRoute.js';

const app = express();
dotenv.config({ path: "./config/config.env" });

// Add custom middleware to handle OPTIONS requests
app.use((req, res, next) => {
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Origin', process.env.FRONTEND_URL || '*');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    return res.status(200).end();
  }
  next();
});

// Configure CORS with correct origin handling
app.use(cors({
    origin: [
        process.env.FRONTEND_URL,  // Use this if it's defined in your .env file
        "http://localhost:3000",
        "http://localhost:4000"
    ], // Ensure the frontend URL is correct here
    credentials: true, // Allow cookies and credentials
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"],
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
