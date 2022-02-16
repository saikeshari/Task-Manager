import express from "express";
import { completeSubTask } from "../controllers/completeSubTask.js";

const router = express.Router();

router.post("/", completeSubTask);

export default router;
