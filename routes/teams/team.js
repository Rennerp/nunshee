import { Router } from "express";
import { verifyAuth } from "../verifyAuth.js";
const router = Router();

router.get("/team", verifyAuth, (req, res) => {
  res.json({
    title: "Teams",
    description: "Data with authorized login",
  });
});

export default router;
