import { createServer } from "http";
import express from "express";
import helmet from "helmet";
import dotenv from "dotenv";
import Router from "./router.js";
import db from "./models/index.js";
import Socket from "./socket/index.js";

dotenv.config();

// Init DataBase
db.sequelize.sync();

// Init App
const app = express();

// Create Server
const httpServer = createServer(app);

// Init Socket
Socket(httpServer);

// Init Helmet
app.use(helmet());

// Parse application/json
app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(express.static("backend/public"));

app.set("view engine", "ejs");

// Route index
app.get("/", (req, res) => {
  res.render("../backend/views/page/index", {});
});

// Route API
app.use("/api", Router);

// Error 404
app.use((req, res) => {
  res.status(404).json({
    type: "error",
    message: "La page demandée n'est existe pas.",
  });
});

// Start Server
app.set("port", process.env.PORT || 3000);
httpServer.listen(app.get("port"), () => {
  const port = httpServer.address().port;
  console.log(`http://localhost:${port}`);
});
