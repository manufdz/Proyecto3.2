const express = require("express");
const Task = require("../models/Tasks");
const taskRouter = express.Router();

taskRouter.post("/tasks", async (req, res) => {
  try {
    const { day, hour, typeoftask, importance, location } = req.body;

    const task = await Task.findOne({ typeoftask });
    if (task) {
      return res.status(401).send({
        succes: false,
        message: "La tarea ya esta creada!",
      });
    }

    const dayRegex = /^([1-9]|[1-2][0-9]|3[01])$/;

    if (!dayRegex.test(day)) {
      return res.status(400).send({
        success: false,
        message: "El día no es válido.",
      });
    }

    if (!day) {
      return res.status(400).send({
        succes: false,
        message: "el campo (día) está vacío",
      });
    }

    const hourRegex = /^([01]\d|2[0-3]):[0-5]\d$/;

    if (!hourRegex.test(hour)) {
      return res.status(400).send({
        success: false,
        message: "El formato de hora no es válido.",
      });
    }

    if (typeoftask.length < 3) {
      return res.status(400).send({
        success: false,
        message: "el evento es demasiado corto",
      });
    }

    if (typeoftask.length > 30) {
      return res.status(400).send({
        success: false,
        message: "el evento es demasiado largo",
      });
    }

    if (!typeoftask) {
      return res.status(400).send({
        success: false,
        message: "el campo (evento) está vacío",
      });
    }

    if (importance.length < 5) {
      return res.status(400).send({
        success: false,
        message: "el campo es demasiado corto",
      });
    }

    if (importance.length > 10) {
      return res.status(400).send({
        success: false,
        message: "el campo es demasiado largo",
      });
    }

    if (location.length < 5) {
      return res.status(400).send({
        success: false,
        message: "el campo es demasiado corto",
      });
    }

    if (location.length > 25) {
      return res.status(400).send({
        success: false,
        message: "el campo es demasiado largo",
      });
    }

    let newTask = new Task({
      day,
      hour,
      typeoftask,
      importance,
      location,
    });
    await newTask.save();

    return res.send({
      succes: true,
      newTask,
      message: "tarea creada correctamente!",
    });
  } catch (error) {
    return res.send({
      succes: false,
      message: error.message,
    });
  }
});

taskRouter.get("/tasks", async (req, res) => {
  try {
    const Tasks = await Task.find({});
    return res.send({
      succes: true,
      message: "aqui estan todas las tareas de la BD!",
      Tasks,
    });
  } catch (error) {
    return res.send({
      succes: false,
      message: error.message,
    });
  }
});

taskRouter.get("/task/:taskID", async (req, res) => {
  try {
    const { taskID } = req.params;
    const Task = await Task.find({ taskID });
    return res.send({
      succes: true,
      message: "tarea encontrada!",
      Task,
    });
  } catch (error) {
    return res.send({
      succes: false,
      message: error.message,
    });
  }
});

taskRouter.delete("/task/:taskID", async (req, res) => {
  try {
    const { taskID } = req.params;
    await Task.findByIdAndDelete(taskID);
    return res.send({
      succes: true,
      message: "tarea borrada de la BD!",
    });
  } catch (error) {
    return res.send({
      succes: false,
      message: error.message,
    });
  }
});

taskRouter.put("/task/:taskID", async (req, res) => {
  try {
    const { taskID } = req.params;
    const { day, hour } = req.body;
    await Task.findByIdAndUpdate(taskID, { day, hour });
    return res.send({
      succes: true,
      message: "tarea actualizada en la BD!",
    });
  } catch (error) {
    return res.send({
      succes: false,
      message: error.message,
    });
  }
});

module.exports = taskRouter;
