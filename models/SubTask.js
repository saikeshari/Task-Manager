import mongoose from "mongoose";

const Schema = mongoose.Schema;

const SubTaskSchema = new Schema({
  title: {
    type: String,
    reqired:true
  },
  completed: {
    type: Boolean,
    default: false
  },
  task : {
    type: mongoose.Schema.Types.ObjectId,
    ref: "task",
  },
},{ timestamps: true });

const Item = mongoose.model("subtask", SubTaskSchema);

export default Item;
