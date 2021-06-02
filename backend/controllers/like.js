import db from "../models/index.js";

const Like = db.modelLike;

// Create or save Like
export const like = async (req, res) => {
  const { like } = req.body;
  if (like > -2 && like < 2) {
    try {
      const likeFind = await Like.findOne({
        where: { messageId: req.params.id, userId: req.userId },
      });

      if (!likeFind) {
        await Like.create({
          like,
          userId: req.userId,
          messageId: req.params.id,
        });
        res.status(201).json({
          type: "succes",
          message: "Le like est créer avec succès",
        });
      } else {
        await Like.update(
          {
            like,
          },
          { where: { messageId: req.params.id, userId: req.userId } }
        );
        res.status(201).json({
          type: "succes",
          message: "Le like est modifier avec succès",
        });
      }
    } catch {
      res.status(500).json({
        type: "error",
        message: "Une erreur s'est produite lors de l'enregistrement du like",
      });
    }
  } else {
    res.status(500).json({
      type: "error",
      message: "Une erreur s'est produite lors de l'enregistrement du like",
    });
  }
};
