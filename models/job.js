
// Model structure for Jobs
'use strict';

module.exports = function(sequelize, DataTypes) {
  var Job = sequelize.define("Job", {
    // 'client_name' field stores Client name
    client_name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    // 'client_location' field stores Client location
    client_location: {
      type: DataTypes.STRING,
      allowNull: false
    },

    client_contact: {
      type: DataTypes.STRING,
      allowNull: true
    },
    // 'services' field stores Job description
    services: {
      type: DataTypes.STRING,
      allowNull: false
    },
    specific_service: {
      type: DataTypes.STRING,
      allowNull: false
    },
    job_status: {
      type: DataTypes.STRING,
      defaultValue: "unaccepted"
    },

  });

// //A Job belongsTo Technician

  

  return Job;
};
