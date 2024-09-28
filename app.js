import express from "express";
import cors from  "cors";
import dotenv from "dotenv";
import { dbConnection } from "./database/dbConnection.js";
import { errorMiddleware } from "./error/error.js";
import reservationRouter from './routes/reservationRoute.js';
const PORT = process.env.PORT || 3000; 
const app=express()
dotenv.config({path: "./config/config.env"});

app.use(cors({
    origin:[process.env.FRONTEND_URL],
    method:["POST"],
    credentials: true,

}));

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/api/v1/reservation',reservationRouter)
dbConnection();

app.use(errorMiddleware);
export default app;