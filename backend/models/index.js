import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import ModelUser from "./user.js";
import ModelMessage from "./message.js";
import ModelLike from "./like.js";
import ModelComment from "./comment.js";

dotenv.config();

const db = {};

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_TYPE,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.modelUser = ModelUser(sequelize, Sequelize);
db.modelMessage = ModelMessage(sequelize, Sequelize);
db.modelComment = ModelComment(sequelize, Sequelize);
db.modelLike = ModelLike(sequelize, Sequelize);

db.modelUser.hasMany(db.modelMessage, {
  foreignKey: {
    allowNull: false,
  },
});
db.modelMessage.belongsTo(db.modelUser);

db.modelUser.hasOne(db.modelLike, {
  foreignKey: {
    allowNull: false,
  },
});
db.modelLike.belongsTo(db.modelUser);

db.modelMessage.hasMany(db.modelLike, {
  foreignKey: {
    allowNull: false,
  },
});
db.modelLike.belongsTo(db.modelMessage);

db.modelUser.hasOne(db.modelComment, {
  foreignKey: {
    allowNull: false,
  },
});
db.modelComment.belongsTo(db.modelUser);

db.modelMessage.hasMany(db.modelComment, {
  foreignKey: {
    allowNull: false,
  },
});
db.modelComment.belongsTo(db.modelMessage);

export default db;
