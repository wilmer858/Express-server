const express = require("express");
const router = express.Router();

let tasks = require("./tasks.json");

// middleware para objeto vacio
const VacioMidd = (req, res, next) => {
  const task = req.body;
  if (Object.keys(task).length === 0) {
    res.status(400).json({ error: "El objeto esta vacio" });
  } else {
    next();
  }
};

// middleware para objeto para informacion no valida o atributos faltantes
const InvalidMidd = (req, res, next) => {
  const { id, isCompleted, description } = req.body;
  if (
    typeof id !== "number" ||
    typeof isCompleted !== "boolean" ||
    typeof description !== "string" ||
    id <= 0 ||
    description.trim() === ""
  ) {
    res.status(400).json({ error: "Tipos de datos no validos" });
  } else {
    next();
  }
};

//Ruta para agregar una tarea
router.post("/", VacioMidd, InvalidMidd, (req, res) => {
  const newTask = req.body;
  tasks.push(newTask);
  console.log("****", newTask);
  res.status(200).json({ Message: "Tarea creada con exito", Tareas: tasks });
});

//Ruta para borrar una tarea por su id
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  tasks = tasks.filter((task) => task.id != id);
  res.status(200).json({ Message: "Tarea eliminada con exito", Tareas: tasks });
});

//Ruta para actualizar una tarea por su id
router.put("/:id", VacioMidd, InvalidMidd, (req, res) => {
  const task = req.body;
  const idtask = task.id;
  const posicion = tasks.findIndex((task) => task.id === idtask);
  if (posicion !== -1) {
    tasks[posicion] = task;
    res
      .status(200)
      .json({ Message: "Tarea actulizada con exito", Tareas: tasks });
  } else {
    res.status(404).json({
      mensaje: "tarea no encontrada",
    });
  }
});

module.exports = router;
