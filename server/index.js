import connectDB from "./config/db.js";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import authRoutes from './routes/auth.Routes.js'
import userRoutes from './routes/user.Routes.js'
import categoryRoutes from './routes/category.Routes.js'
import serviceRoutes from './routes/service.Routes.js'
import ReviewRoutes from './routes/review.Routes.js'
import RequestRoutes from './routes/request.Routes.js'

dotenv.config();
connectDB();

const app = express();


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
app.use('/api',categoryRoutes)
app.use('/api',serviceRoutes)
app.use('/api',ReviewRoutes)
app.use('/api',RequestRoutes)

const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));