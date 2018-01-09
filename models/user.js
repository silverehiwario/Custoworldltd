// Model structure for Authentication
'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User",{
    // 'user_name' field stores User's name

      user_name: {

      type: DataTypes.STRING,
      allowNull: false
    },
    // 'Password' field stores the password
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // 'role' field stores user's role
    role: {
      type: DataTypes.STRING,
      allowNull: false
    },
      });

  return User;
};
