'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Courses extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Courses.init({
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    course_name: {
      type:DataTypes.STRING,
      allowNull: false
    },
    department: {
      type:DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'Courses',
  });

  Courses.associate = (models) => {
    Courses.hasOne(models.CourseDetails, {
      as: "CourseId",
      foreignKey:{
        allowNull: false,
        name: "course_id"
      }
    });
  }
  return Courses;
};