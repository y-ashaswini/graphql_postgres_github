"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class authors extends Model {
    static associate(models) {
      authors.hasMany(models.books, {
        foreignKey: "authorId",
        as : "books",
        onDelete: "CASCADE"
      })
    }
  }
  authors.init(
    {
      name: DataTypes.STRING,
      age: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "authors",
    }
  );
  return authors;
};
