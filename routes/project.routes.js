const express = require('express');
const controller = require('../controllers/projects.js');
const projectRouter = express.Router();

projectRouter.get("/", controller.getAll);
projectRouter.get("/:id", controller.getOne);
projectRouter.post("/", controller.createOne);
projectRouter.put("/:id", controller.updateOne);
projectRouter.delete("/:id", controller.deleteOne);

module.exports = projectRouter;