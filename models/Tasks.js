const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    day: {
      type: String,
    },
    hour: {
      type: String,
    },
    typeoftask: {
      type: String,
      minlenght: 3,
      maxlenght: 20,
    },
    importance: {
      type: String,
    },
    location: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);
