import db from "../models/index.js";

const Comment = db.modelComment;

// Create a new Comment
export const createComment = async (req, res) => {
  const { content } = req.body;
  try {
    await Comment.create({
      content,
      userId: req.userId,
      messageId: req.params.id,
    });

    res.status(201).json({
      type: "succes",
      message: "Le commentaire à est créer avec succès",
    });
  } catch {
    res.status(500).json({
      type: "error",
      message:
        "Une erreur s'est produite lors de l'enregistrement du commentaire",
    });
  }
};
