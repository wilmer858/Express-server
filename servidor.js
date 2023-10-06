const express = require("express");
const listView = require("./list-view-router");
const listEdit = require("./list-edit-router");
let tasks = require("./tasks.json");

const app = express();

const port = 8080;

app.use(express.json());

//Middleware para gestionar métodos http validos dentro del servidor
function method(req, res, next) {
  const method = req.method;
  if (
    method === "GET" ||
    method === "POST" ||
    method === "PUT" ||
    method === "DELETE"
  ) {
    next();
  } else {
    res.status(405).send("Método de solicitud http no válido");
  }
}

app.use(method);

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

//Ruta generica
app.use("/task", listView, listEdit);

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
