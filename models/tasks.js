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
      tittle: { type: DataTypes.STRING(50), unique: true, len: [2, 50] },
      details: { type: DataTypes.STRING(100), len: [2, 100] },
      status: { type: DataTypes.BOOLEAN },
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
