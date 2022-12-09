const db = require('../../models/index.js');

const Task = db.Tasks;

exports.getAll = async (req, res, next) => {
  try {
    const ALL = await Task.findAll();
    return res.status(200).json(ALL);
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
}

exports.getOne = async (req, res, next) => {
  try {
    const ROW = await Task.findByPk(req.params.id);
    if (!ROW) {
      return res.status(500).send("The task was not found");
    }
    return res.status(200).json(ROW);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
}

exports.createOne = async (req, res, next) => {
  try {
    const TASK_MODEL = {
      ProjectId: req.body.ProjectId,
      title: req.body.title,
      description: req.body.description,
      done: req.body.done
    }
    try {
      const task = await Task.create(TASK_MODEL);
      return res.status(201).json(task);
    } catch (err) {
      return res.status(500).json(err);
    }
  } catch (err) {
    return res.status(500).json(err);
  }
};

exports.updateOne = async (req, res, next) => {
  try {
    const TASK_MODEL = {
      ProjectId: req.body.ProjectId,
      title: req.body.title,
      description: req.body.description,
      done: req.body.done
    }
    try {
      const task = await Task.update(TASK_MODEL, {where: {id: req.params.id}});
      if (!task) {
        return res.status(500).send("The task was not found");
      }
      return res.status(200).json(project);
    } catch (err) {
      return res.status(500).json(err);
    }
  } catch (err) {
    return res.status(500).json(err);
  }
};

exports.deleteOne = async (req, res, next) => {
  try {
    const task = await Task.destroy({where: {id: req.params.id}});
    if (!task) {
      return res.send("The task was not found");
    }
    return res.status(200).json(task);
  } catch (err) {
    return res.status(500).json(err); 
  }
};
