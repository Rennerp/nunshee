import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import mongoose from "mongoose";

import AuthRoutes from "./routes/auth/auth.js";
import TeamRoutes from "./routes/teams/team.js";
dotenv.config();

//Connect to db
mongoose.connect(
  process.env.DBCONNECTION,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (error) => {
    if (error) throw error;

    console.log(`Database is connected`);
  }
);

// Configs
const app = express();
const port = process.env.PUERTO || 2000;

// Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api/auth", AuthRoutes);
app.use("/api", TeamRoutes);

// Server
app.listen(port, () => {
  console.log(`Server on port ${port}`);
});
