'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CourseDetails extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CourseDetails.init({
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    professor:{
      type: DataTypes.STRING,
      allowNull: false
    },
    title: {
      type:DataTypes.STRING,
      allowNull: false
    },
    description: {
      type:DataTypes.TEXT,
      allowNull: false
    },
    estimated_time: {
      type:DataTypes.STRING,
    },
    materials_needed: {
      type:DataTypes.STRING,
    }
  }, {
    sequelize,
    createdAt:false,
    updatedAt:false,
    tableName:"CourseDetails"
  });

  CourseDetails.associate = (models) => {
    CourseDetails.belongsTo(models.Courses,{
        foreignKey:{
        allowNull: false,
        name: "course_id"
      },
      onDelete:'Cascade',
    })
  }

  return CourseDetails;
};