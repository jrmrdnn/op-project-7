const ModelLike = (sequelize, Sequelize) => {
  return sequelize.define("like", {
    like: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        isInt: {
          msg: "Veuillez renseigner un nombre",
        },
        max: 1,
        min: -1,
      },
    },
  });
};

export default ModelLike;
