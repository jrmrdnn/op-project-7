const ModelMessage = (sequelize, Sequelize) => {
  return sequelize.define("message", {
    title: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Veuillez renseigner le titre",
        },
      },
    },
    content: {
      type: Sequelize.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Veuillez renseigner le contenu",
        },
      },
    },
    imageUrl: {
      type: Sequelize.TEXT,
    },
  });
};

export default ModelMessage;
