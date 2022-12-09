const express = require('express');
const controller = require('../controllers/tasks.js');
const taskRouter = express.Router();

taskRouter.get("/", controller.getAll);
taskRouter.get("/:id", controller.getOne);
taskRouter.post("/", controller.createOne);
taskRouter.put("/:id", controller.updateOne);
taskRouter.delete("/:id", controller.deleteOne);

module.exports = taskRouter;