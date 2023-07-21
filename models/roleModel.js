module.exports = (sequelize, DataTypes) => {
  return sequelize.define("roles", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    label: { type: DataTypes.STRING },
  });
};
