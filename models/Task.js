import mongoose from "mongoose";

const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  subTasks : {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "subtask",
  },
  completed: {
      type: Boolean,
      default:false
  }
},{ timestamps: true });

const Item = mongoose.model("task", TaskSchema);

export default Item;
