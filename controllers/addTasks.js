import Task from "../models/Task.js";
import SubTask from "../models/SubTask.js";

export const addTask = async (req, res) => {
  const taskToAdd = req.body;

  const temp = taskToAdd.subtasks.split(",");

  const taskToAddFinal = { ...taskToAdd, subTasks: [] };

  const newTask = new Task(taskToAddFinal);
  // console.log(newTask);
  try {
    const savedTask = await newTask.save();

    var subtasksArr = [];

    const asyncFunc = async () => {
      const unresolvedPromises = temp.map(async (obj) => {
        const newSubTask = new SubTask({
          title: obj,
          task:savedTask._id
        });
        try {
          const savedSubTask = await newSubTask.save();
          subtasksArr = [...subtasksArr, savedSubTask._id];
        } catch (error) {
          console.log(error);
          // res.status(409).json({ message: error.message });
        }
      });
      return Promise.all(unresolvedPromises);
    };

    await asyncFunc();

    // console.log("38" + subtasksArr);

    try {
      const updatedTask = await Task.findOneAndUpdate(
        { _id: savedTask._id },
        { $set: { subTasks: subtasksArr } }
      );
      res.status(200).json({ updatedTask });
    } catch (error) {
      res.status(409).json({ message: error.message });
    }

  } catch (error) {
    res.status(409).json({ message: error.message });
  }

};
