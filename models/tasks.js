"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Tasks extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Tasks.belongsTo(models.Projects, {});
    }
  }
  Tasks.init(
    {
      ProjectId: {
        type: DataTypes.INTEGER,
        isInt: true,
        min: 1,
        references: {
          model: "Projects",
          key: "id",
        },
      },
      title: { type: DataTypes.STRING(50), unique: true, len: [2, 50] },
      description: { type: DataTypes.STRING(100), len: [2, 100] },
      done: { type: DataTypes.BOOLEAN },
    },
    {
      sequelize,
      modelName: "Tasks",
      omitNull: false,
      timestamps: false,
    }
  );
  return Tasks;
};