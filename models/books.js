"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class books extends Model {
    static associate(models) {
      // define association here
      books.belongsTo(models.authors, {
        foreignKey: "authorId",
        as: "books",
        onDelete: "CASCADE",
      });
    }
  }
  books.init(
    {
      name: DataTypes.STRING,
      genre: DataTypes.STRING,
      authorId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "books",
    }
  );
  return books;
};
