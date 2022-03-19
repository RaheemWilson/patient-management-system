// Module Imports
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";

// Route Imports


const app = express();

// Initialize Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Declare constants
const MONGODB_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT || 8080;

// Connect to MongoDB
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Successfuly connected to MongoDB"))
  .catch((error) => console.log("Unable to connect to mongodb"));

// Register Routes


app.get("/", (req, res, next) => {
  res.json({ message: "from index api" });
});

app.listen(PORT, () => {
  console.log(`Server is running`);
});