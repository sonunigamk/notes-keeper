import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import noteRouters from "./routes/note.route.js";
import userRouters from "./routes/user.route.js";
import connectDB from "./config/db.js";

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "https://notes-keeperr.vercel.app",
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("your backend is working fine");
});

app.use("/api/v1/users", userRouters);
app.use("/api/v1/notes", noteRouters);

app.listen(PORT, () => console.log(`server is running on port : ${PORT}`));