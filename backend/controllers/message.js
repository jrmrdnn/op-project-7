import fs from "fs";
import db from "../models/index.js";

const Message = db.modelMessage;
const User = db.modelUser;
const Like = db.modelLike;
const Comment = db.modelComment;

// Create and Save a new Message
export const createMessage = async (req, res) => {
  const { title, content } = req.body;
  try {
    const message = await Message.create({
      title,
      content,
      userId: req.userId,
      imageUrl: req.file?.filename
        ? `${req.protocol}://${req.get("host")}/img/${req.file.filename}`
        : undefined,
    });

    res.status(201).json({
      type: "succes",
      message: "Le message est enregistré avec succès.",
      data: message,
    });
  } catch (err) {
    res.status(500).json({
      type: "erreur",
      message:
        "Une erreur s'est produite lors de la création du message: " +
        err.message,
    });
  }
};

// Retrieve all Messages from the database.
export const findAllMessage = async (req, res) => {
  try {
    const message = await Message.findAll({
      order: [["createdAt", "DESC"]],
      attributes: {
        exclude: ["userId", "updatedAt", "deletedAt"],
      },
      include: [
        {
          model: User,
          attributes: ["username", "id"],
        },
        {
          model: Like,
          attributes: ["like", "userId"],
        },
        {
          model: Comment,
          attributes: ["content"],
          include: {
            model: User,
            attributes: ["username"],
          },
        },
      ],
    });

    res.json({
      type: "succes",
      data: message,
    });
  } catch {
    res.status(500).json({
      type: "erreur",
      message:
        "Une erreur s'est produite lors de la récupération des messages.",
    });
  }
};

// Update a Message by the id in the request
export const updateMessage = async (req, res) => {
  const { title, content, imgUrl } = req.body;

  if (title === "" || content === "") {
    res.json({
      type: "error",
      message: "Le titre et le contenu du message ne peut être vide",
    });
  }

  try {
    const message = await Message.update(
      {
        title,
        content,
        imageUrl: req.file?.filename
          ? `${req.protocol}://${req.get("host")}/img/${req.file.filename}`
          : imgUrl,
      },
      {
        where: { id: req.params.id },
      }
    );

    if (message == 1) {
      res.json({
        type: "succes",
        message: "Le message a bien été modifié",
      });
    } else {
      res.json({
        type: "error",
        message: "Le message n'a pas été modifié",
      });
    }
  } catch {
    res.status(500).json({
      message: "Une erreur s'est produite lors de la modification",
    });
  }
};

// Delete Message
export const deleteMessage = async (req, res) => {
  try {
    const message = await Message.findByPk(req.params.id);

    if (message.imageUrl)
      fs.unlink(
        `backend/public/img/${message.imageUrl.split("/img/")[1]}`,
        async () => {
          await Message.destroy({
            where: {
              id: req.params.id,
            },
          });
        }
      );
    else
      await Message.destroy({
        where: {
          id: req.params.id,
        },
      });

    res.json({
      type: "succes",
      message: "Le message a bien été supprimé",
    });
  } catch {
    res.status(500).json({
      type: "error",
      message: "Une erreur s'est produite lors de la suppression",
    });
  }
};
