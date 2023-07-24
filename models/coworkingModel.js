module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Coworking", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      unique: {
        msg: "Le nom est déjà pris",
      },
    },
    price: {
      type: DataTypes.JSON,
      validate: {
        customValidator(value) {
          if (
            value.hasOwnProperty("hour") &&
            value.hasOwnProperty("day") &&
            value.hasOwnProperty("month")
          ) {
            if (
              value.hour === null &&
              value.day === null &&
              value.month === null
            ) {
              throw new Error("Price cannot have all values set to null");
            }
          } else {
            throw new Error("Incorect syntax in Price JSON");
          }
        },
      },
    },
    superficy: {
      type: DataTypes.INTEGER,
      validate: {
        isNumeric: {
          msg: `La superficie doit être un nombre`,
        },
      },
    },
    capacity: {
      type: DataTypes.INTEGER,
      validate: {
        isNumeric: {
          msg: `La capacité doit être un nombre`,
        },
      },
    },
    address: DataTypes.JSON,
  });
};
