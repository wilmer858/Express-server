const express = require("express");
const router = express.Router();

let tasks = require("./tasks.json");

//Ruta para obtener tareas completadas o incompletas
router.get("/:estado", (req, res) => {
  const estado = req.params.estado;
  if (estado === "completas" || estado === "incompletas") {
    const filteredTasks = tasks.filter((task) => {
      return estado === "completas"
        ? task.isCompleted === true
        : task.isCompleted === false;
    });
    res.status(200).send(filteredTasks);
  } else {
    res
      .status(400)
      .send("Estado no válido. Debe ser 'completas' o 'incompletas'.");
  }
});

module.exports = router;
