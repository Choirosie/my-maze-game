import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import cookieParser from "cookie-parser";
import cors from "cors";
import path from 'path';
import { fileURLToPath } from 'url';
import morgan from "morgan";

import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import clearedPagesRoute from "./routes/clearedPages.js";




const app = express()
dotenv.config()

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("Connected to mogoDB");
    } catch (error) {
        throw error;
    }
};

mongoose.connection.on("disconnected", () => {
    console.log("mongoDB disconncted!");
});

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
};
app.use(cors(corsOptions));

app.use(cookieParser())

app.use(express.json())

app.use(morgan('combined'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// app.use("/api/stages", stageRoutes);
app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/clearedPages", clearedPagesRoute);

app.listen(process.env.PORT, () => {
    connect();
    console.log("Connected tp backend.");
});

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";
    return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
    });
   });
