import { Router as RouterExpress } from "express";
import VerifUser from "./middleware/user.js";
import Multer from "./middleware/multer.js";
import { AccountLimiter, ApiLimiter } from "./middleware/rateLimit.js";
import { deleteUser, findAllUser, login, signup } from "./controllers/user.js";
import { like } from "./controllers/like.js";
import {
  createMessage,
  findAllMessage,
  updateMessage,
  deleteMessage,
} from "./controllers/message.js";
import { createComment } from "./controllers/comment.js";

const Router = RouterExpress({ strict: true });

Router.get("/user", ApiLimiter, VerifUser, findAllUser);
Router.delete("/user/:id", ApiLimiter, VerifUser, deleteUser);
Router.post("/user/signup", AccountLimiter, signup);
Router.post("/user/login", AccountLimiter, login);

Router.get("/message", ApiLimiter, VerifUser, findAllMessage);
Router.post("/message", ApiLimiter, VerifUser, Multer, createMessage);
Router.put("/message/:id", ApiLimiter, VerifUser, Multer, updateMessage);
Router.delete("/message/:id", ApiLimiter, VerifUser, deleteMessage);

Router.post("/like/:id", ApiLimiter, VerifUser, like);

Router.post("/comment/:id", ApiLimiter, VerifUser, createComment);

export default Router;
