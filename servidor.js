const express = require("express");
const listView = require("./list-view-router");
const listEdit = require("./list-edit-router");
let tasks = require("./tasks.json");
const router = require("./list-view-router");

const app = express();

const port = 8000;

app.use(express.json());

//Ruta para mostrar todas las tareas
app.get("/", (req, res) => {
  res.status(200).send(tasks);
});

//Ruta para filtrar una tarea por su id
app.get("/:id", (req, res) => {
  const id = req.params.id;
  const task = tasks.find((task) => task.id == id);
  if (task) {
    res.status(200).send(task);
  } else {
    res.status(400).send("El valor del parámetro no es válido.");
  }
});

app.use("/task", listView, listEdit);

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
