export default function ModelComment(sequelize, Sequelize) {
  return sequelize.define(
    "comment",
    {
      content: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Veuillez renseigner le contenu",
          },
        },
      },
    },
    { paranoid: true }
  );
}
