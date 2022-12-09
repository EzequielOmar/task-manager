"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Projects extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Projects.belongsTo(models.Users, {});
      models.Projects.hasMany(models.Tasks, {
        foreignKey: "ProjectId",
        onUpdate: 'cascade'
      });
    }
  }
  Projects.init(
    {
      UserId: {
        type: DataTypes.INTEGER,
        isInt: true,
        min: 1,
        references: {
          model: "Users",
          key: "id",
        },
      },
      title: { type: DataTypes.STRING(50), unique: true, len: [2, 50] },
      description: { type: DataTypes.STRING(100), len: [2, 100] },
    },
    {
      sequelize,
      modelName: "Projects",
      omitNull: false,
    }
  );
  return Projects;
};
