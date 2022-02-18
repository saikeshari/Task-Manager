import Task from "../models/Task.js";
import SubTask from "../models/SubTask.js";

export const completeSubTask = async (req, res) => {
  console.log(req.body);

  try {
    const updatedSubTask = await SubTask.findOneAndUpdate(
      { _id: req.body._id },
      {
        $set: { completed: req.body.status },
      }
    );

    const taskId = updatedSubTask.task;

    const taskObj = await Task.findOne({ _id: taskId }).populate({
        path:"subTasks",
        model:SubTask
    });

    console.log(taskObj);

    var subTaskscomplete = taskObj.subTasks.map(obj => obj.completed);

    console.log(subTaskscomplete);

    let checker = subTaskscomplete.every(v => v === true);

    console.log(checker);

    if(checker) {
        const updatedTask = await Task.findOneAndUpdate(
            { _id: taskObj._id },
            {
              $set: { completed: true },
            }
          );
    }

    res.status(200).json({ message: "hey" });
  } catch (error) {
    res.status(409).json(error);
  }
};
