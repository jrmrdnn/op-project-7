const ModelUser = (sequelize, Sequelize) => {
  return sequelize.define("user", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: {
        msg: "Votre nom n'est pas disponible",
      },
      validate: {
        notNull: {
          msg: "Veuillez renseigner votre nom",
        },
      },
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: {
        msg: "Votre e-mail n'est pas disponible",
      },
      validate: {
        notNull: {
          msg: "Veuillez renseigner votre e-mail",
        },
        isEmail: {
          msg: "Votre e-mail n'est pas valide",
        },
      },
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Veuillez renseigner le mot de passe",
        },
      },
    },
    isAdmin: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  });
};

export default ModelUser;
