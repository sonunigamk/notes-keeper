import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

import noteRouters from "./routes/note.route.js";

// Configure dotenv
dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

try {
  await mongoose.connect(process.env.MONGODB_URL, {
    dbName: "notesKeeper", 
  });
  console.log("MongoDB connected successfully");
} catch (err) {
  console.error("MongoDB connection error:", err);
}


//Routing Middleware
app.use(express.json());
app.use(
  cors({
    origin: "*", 
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  })
);

app.get('/',(req,res)=>{
  res.send("your backend is working fine")
})

app.use("/api/v1/notes", noteRouters);

app.listen(PORT, () => console.log(`server is running on port : ${PORT}`));
