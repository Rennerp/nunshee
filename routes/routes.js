import { Router } from "express";
const router = Router();

router.get("/api", (req, res) => {
  res.json({ Title: "Hello World" });
});

export default router;

