import express from "express";
import {addTask} from '../controllers/addTasks.js';
import { getArchivedTasks, getCompletedTasks, getInProgressTasks } from "../controllers/getTasks.js";

const router = express.Router();

router.post("/", addTask);
router.get("/inprogress", getInProgressTasks);
router.get("/completed", getCompletedTasks);
router.get("/archived", getArchivedTasks);

export default router;
