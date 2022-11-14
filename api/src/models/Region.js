const { DataTypes } = require('sequelize');

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('region', {
    id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
    },
    regiones: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
    },
  {
    timestamps: false,
    createdAt: false,
    updateAt: false,
  });
};