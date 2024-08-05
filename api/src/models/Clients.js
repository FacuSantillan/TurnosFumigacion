const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

  sequelize.define('Clients', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, // especifica un UUID generado automaticamente
      allowNull: false,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
    },
    apellido: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
    },
    telefono:{
      type :DataTypes.STRING ,
      allowNull: false,
      unique: false,
    },
    direccion:{
      type :DataTypes.STRING ,
      allowNull: false,
      unique: false,
    },
    barrio:{
      type :DataTypes.STRING ,
      allowNull: false,
      unique: false,
    },
    indicaciones:{
      type :DataTypes.STRING ,
      allowNull: false,
      unique: false,
    },
  },
);
};