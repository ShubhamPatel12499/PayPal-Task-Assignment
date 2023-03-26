const express = require("express");
const { addSprint, getSprint, deleteSprint } = require("../controller/sprint.controller");
const sprintRoute = express.Router();

sprintRoute.get("/", async (req, res) => {
    const { flag, data, message, desc } = await getSprint();
    if (flag) {
        return res.status(201).send({ message, desc, data })
    } else {
        return res.status(401).send({ message, desc, data })
    }
})

sprintRoute.post("/", async (req, res) => {
    const { name, startDate, endDate, sprintTasks } = req.body
    const { flag, data, message, desc } = await addSprint({ name, startDate, endDate, sprintTasks });
    if (flag) {
        return res.status(201).send({ message, desc, data })
    } else {
        return res.status(401).send({ message, desc, data })
    }
})

sprintRoute.delete("/:id", async (req, res) => {
    const id = req.params.id;
    const { flag, data, message, desc } = await deleteSprint({ id });
    if (flag) {
        return res.status(201).send({ message, desc, data })
    } else {
        return res.status(401).send({ message, desc, data })
    }
})


module.exports = sprintRoute;