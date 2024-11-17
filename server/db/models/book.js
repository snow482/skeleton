'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    static associate({ User }) {
      this.belongsTo(User, {
        foreignKey: "user_id"
      })
    }
  }
  Book.init({
    title: {
      allowNull: false,
      type: DataTypes.STRING(1000),
    },
    description: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
    cover: {
      defaultValue:
        "https://ir.ozone.ru/s3/multimedia-r/c1000/6727627935.jpg",
      type: DataTypes.TEXT,
    },
    user_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        key: "id",
        model: "Users",
      },
      onDelete: "cascade",
    },
  }, {
    sequelize,
    modelName: 'Book',
  });
  return Book;
};