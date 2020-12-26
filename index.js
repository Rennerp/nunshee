import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";

import Routes from "./routes/routes.js";
dotenv.config();

// Configs
const app = express();
const port = process.env.PUERTO || 2000;

// Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use(Routes);

// Server
app.listen(port, () => {
  console.log(`Server on port ${port}`);
});
