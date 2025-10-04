import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

import noteRouters from "./routes/note.route.js";

// Configure dotenv
dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

//Routing Middleware
app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true, // if you need cookies
  })
);
app.use("/api/v1/notes", noteRouters);

app.listen(PORT, () => console.log(`server is running on port : ${PORT}`));
