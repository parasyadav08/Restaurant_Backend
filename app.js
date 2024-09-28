// app.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { dbConnection } from "./database/dbConnection.js";
import { errorMiddleware } from "./error/error.js";
import reservationRouter from './routes/reservationRoute.js';

const app = express();


// Load environment variables from .env file
dotenv.config({ path: "./config/config.env" });

// CORS configuration
app.use(cors({
    origin: [process.env.FRONTEND_URL, "http://localhost:3000", "http://localhost:4000"], 
    credentials: false,
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    allowedHeaders: ["Content-Type"],
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

// No need to call app.listen here
export default app;
