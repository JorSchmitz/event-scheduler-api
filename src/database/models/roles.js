'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Roles extends Model {
    static associate(models) {
      Roles.hasMany(models.Users, { as: 'users', foreignKey: 'role_id' })
    }
  }
  Roles.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: 'Roles',
      tableName: 'roles',
      underscored: true,
      timestamps: true,
    }
  )
  return Roles
}
