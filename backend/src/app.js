/* eslint-disable no-unused-vars */
// Module Imports
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";

// Route Imports
import authRoutes from './api/routes/auth.routes'
import patientRoutes from './api/routes/patient.routes'
import doctorRoutes from './api/routes/doctor.routes'
import userRoutes from './api/routes/user.routes'

const app = express();

// Initialize Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:3000"
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Declare constants
const MONGODB_URI = process.env.NODE_ENV === "test" ? 'mongodb://localhost:27017/pmsapp-test' : process.env.MONGODB_URI;


// Connect to MongoDB
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Successfuly connected to MongoDB"))
  .catch((error) => console.log("Unable to connect to mongodb"));

// Register Routes
app.use("/auth", authRoutes)
app.use("/patient", patientRoutes)
app.use("/doctors", doctorRoutes)
app.use("/user", userRoutes)

module.exports = app