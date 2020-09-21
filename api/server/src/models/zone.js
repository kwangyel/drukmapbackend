'use strict';
module.exports = (sequelize, DataTypes) => {
  const Zone = sequelize.define('Zones', {
    zone_id: DataTypes.INTEGER,
    sub_zone: DataTypes.STRING
  }, {
    tableName: 'zone_prj',
    timestamps: false
  });
  Zone.associate = function(models) {
    // associations can be defined here
  };
  return Zone;
};