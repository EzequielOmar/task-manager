"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Users.hasMany(models.Projects, {
        foreignKey: "UserId",
      });
    }
  }
  Users.init(
    {
      firstName: {
        type: DataTypes.STRING(50),
        validate: { is: /^[a-zA-Z ]+$/i, len: [2, 100] },
      },
      lastName: {
        type: DataTypes.STRING(50),
        validate: { is: /^[a-zA-Z ]+$/i, len: [2, 100] },
      },
      email: { type: DataTypes.STRING(100), isEmail: true, unique: true },
      password: {
        type: DataTypes.STRING(100),
        validate: {
          is: /^[0-9a-f]{100}$/i,
        },
      },
    },
    {
      sequelize,
      modelName: "Users",
      omitNull: false,
    }
  );
  return Users;
};
