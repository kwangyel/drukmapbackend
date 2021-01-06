'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    provider: DataTypes.STRING,
    email:DataTypes.STRING,
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    token: DataTypes.STRING,
    idToken: DataTypes.STRING,
    password: DataTypes.STRING,
    selector: DataTypes.STRING,
    validator: DataTypes.STRING,
    tokenExpiry: DataTypes.DATE,
  }, {
    timestamps: false,
    freezeTableName: true,
    tableName: 'Users'
  });
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};