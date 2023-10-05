const express = require("express");
const router = express.Router();

let tasks = require("./tasks.json");

//Ruta para agregar una tarea
router.post("/", (req, res) => {
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
router.put("/:id", (req, res) => {
  const task = req.body;
  const idtask = task.id;
  const posicion = tasks.findIndex((task) => task.id === idtask);
  if (posicion !== -1) {
    tasks[posicion] = task;
    res
      .status(200)
      .json({ Message: "Tarea actulizada con exito", Tareas: tasks });
  } else {
    res.status(404).send({
      mensaje: "libro no encontrado",
    });
  }
});

module.exports = router;
