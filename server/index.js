import connectDB from "./config/db.js";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import authRoutes from './routes/auth.Routes.js'
import userRoutes from './routes/user.Routes.js'
dotenv.config();
connectDB();

const app = express();

//MIDDLEWARE 
app.use(cookieParser());
app.use(helmet())
app.use(cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));
app.use(express.json());

app.use('/api',authRoutes)
app.use('/api',userRoutes)

const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));