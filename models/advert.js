'use strict';
module.exports = function(sequelize, DataTypes) {
  var Advert = sequelize.define("Advert", {


    upload_image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // 'skill' field stores skills required for different types of services
    input_website: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Advert;
};
