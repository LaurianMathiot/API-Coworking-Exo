module.exports = (sequelize, DataTypes) => {
  return sequelize.define("users", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      unique: {
        msg: "Le nom est déjà pris",
      },
      allowNull: false,
      validate: {
        notNull: {
          msg: "Pas possible",
        },
        notEmpty: {
          msg: `Le nom d'utilisateur ne peut pas être vide`,
        },
      },
    },
    password: DataTypes.STRING,
  });
};
