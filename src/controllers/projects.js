const db = require('../../models/index.js');

const Project = db.Projects;

exports.getAll = async (req, res, next) => {
  try {
    const ALL = await Project.findAll();
    return res.status(200).json(ALL);
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
}

exports.getOne = async (req, res, next) => {
  try {
    const ROW = await Project.findByPk(req.params.id);
    if (!ROW) {
      return res.status(500).send("The project was not found");
    }
    return res.status(200).json(ROW);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
}

exports.createOne = async (req, res, next) => {
  try {
    const PROJECT_MODEL = {
      UserId: req.body.UserId,
      title: req.body.title,
      description: req.body.description
    }
    try {
      const project = await Project.create(PROJECT_MODEL);
      return res.status(201).json(project);
    } catch (err) {
      return res.status(500).json(err);
    }
  } catch (err) {
    return res.status(500).json(err);
  }
};

exports.updateOne = async (req, res, next) => {
  try {
    const PROJECT_MODEL = {
      UserId: req.body.UserId,
      title: req.body.title,
      description: req.body.description
    }
    try {
      const project = await Project.update(PROJECT_MODEL, {where: {id: req.params.id}});
      if (!project) {
        return res.status(500).send("The project was not found");
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
    const project = await Project.destroy({where: {id: req.params.id}});
    if (!project) {
      return res.send("The project was not found");
    }
    return res.status(200).json(project);
  } catch (err) {
    return res.status(500).json(err); 
  }
};
