module.exports = (sequelize, DataTypes) => {
  const Teacher = sequelize.define('teacher', {
    name: {
      type: DataTypes.STRING,
      unique: true
    },
    position: {
      type: DataTypes.INTEGER
    }
  })
  Teacher.associate = function (models) {
    Teacher.belongsTo(models.group)
    Teacher.hasMany(models.student)
  }
  return Teacher
}