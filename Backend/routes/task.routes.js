const express = require("express");
const { getTask, addTask, deleteTask, updateTask, filterTaskBySprintId, userTask } = require("../controller/task.controller");
const taskRoute = express.Router();

taskRoute.get("/", async (req, res) => {
    const { flag, data, message, desc } = await getTask();
    if (flag) {
        return res.status(201).send({ message, desc, data })
    } else {
        return res.status(401).send({ message, desc, data })
    }
})

taskRoute.post("/", async (req, res) => {

    const { flag, data, message, desc } = await addTask({ ...req.body });
    if (flag) {
        return res.status(201).send({ message, desc, data })
    } else {
        return res.status(401).send({ message, desc, data })
    }
})

taskRoute.delete("/:id", async (req, res) => {
    const id = req.params.id;
    const { flag, data, message, desc } = await deleteTask({ id });
    if (flag) {
        return res.status(201).send({ message, desc, data })
    } else {
        return res.status(401).send({ message, desc, data })
    }
})

taskRoute.patch("/:id", async (req, res) => {
    const id = req.params.id;
    const { flag, data, message, desc } = await updateTask({ id, ...req.body });
    if (flag) {
        return res.status(201).send({ message, desc, data })
    } else {
        return res.status(401).send({ message, desc, data })
    }
})

taskRoute.get("/filter", async (req, res) => {
    const { sprintId } = req.query;
    console.log('sprintId:', sprintId)
    const { flag, data, message, desc } = await filterTaskBySprintId({ sprintId });
    if (flag) {
        return res.status(201).send({ message, desc, data })
    } else {
        return res.status(401).send({ message, desc, data })
    }
})

taskRoute.post("/individual", async (req, res) => {

    const { flag, data, message, desc } = await userTask({ ...req.body });
    if (flag) {
        return res.status(201).send({ message, desc, data })
    } else {
        return res.status(401).send({ message, desc, data })
    }
})

module.exports = taskRoute;