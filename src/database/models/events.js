'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Events extends Model {
    static associate(models) {}
  }
  Events.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      start_time: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      end_time: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      location: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'Events',
      tableName: 'events',
      underscored: true,
      timestamps: true,
    }
  )
  return Events
}
