import Task from "../models/Task.js";
import SubTask from "../models/SubTask.js";

export const getInProgressTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ completed: false }).populate({
      path: "subTasks",
      model: SubTask,
    });

    res.status(200).json(tasks);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const getCompletedTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ completed: true }).sort({'createdAt': 'desc'}).populate({
      path: "subTasks",
      model: SubTask,
    });

    res.status(200).json(tasks.slice(0,10));
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const getArchivedTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ completed: true }).sort({'createdAt': 'desc'}).populate({
          path: "subTasks",
          model: SubTask,
        });

        const temp = tasks.splice(0,10);
    
        res.status(200).json(tasks);
      } catch (error) {
        res.status(409).json({ message: error.message });
      }
};
