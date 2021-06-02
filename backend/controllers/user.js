import argon2 from "argon2";
import jwt from "jsonwebtoken";
import db from "../models/index.js";

const User = db.modelUser;

// Retrieve all Users from the database.
export const findAllUser = async (req, res) => {
  try {
    const user = await User.findAll({
      attributes: {
        exclude: [
          "password",
          "email",
          "isAdmin",
          "createdAt",
          "updatedAt",
          "deletedAt",
        ],
      },
    });
    res.json({
      type: "succes",
      data: user,
    });
  } catch {
    res.status(500).json({
      type: "erreur",
      message:
        "Une erreur s'est produite lors de la récupération des utilisateurs.",
    });
  }
};

// Delete User
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (user.id === req.userId || req.admin) {
      await User.destroy({
        where: {
          id: req.params.id,
        },
      });
      res.json({
        type: "succes",
        message: "L'utilisateur a bien été supprimé",
      });
    } else {
      res.status(400).json({
        type: "error",
        message: "Vous ne pouvait pas supprimer l'utilisateur",
      });
    }
  } catch {
    res.status(500).json({
      type: "error",
      message:
        "Une erreur s'est produite lors de la suppression de l'utilisateur",
    });
  }
};

// User login
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user)
      return res
        .status(401)
        .json({ type: "error", message: "Utilisateur non trouvé !" });

    const valid = await argon2.verify(user.password, password);

    if (!valid)
      return res
        .status(401)
        .json({ type: "error", message: "Mot de passe incorrect !" });

    res.status(200).json({
      type: "succes",
      message: "L'utilisateur a été connecté avec succès",
      user: { id: user.id, username: user.username },
      token: jwt.sign(
        {
          userId: user.id,
          username: user.username,
          admin: user.isAdmin,
        },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: "48h",
        }
      ),
    });
  } catch {
    res.status(400).json({
      type: "error",
      message: "Une erreur s'est produite.",
    });
  }
};

// User registration
export const signup = async (req, res) => {
  const { lastName, firstName, email, password } = req.body;

  if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(password)) {
    try {
      const hash = await argon2.hash(password);

      const user = await User.create({
        username: `${firstName} ${lastName}`,
        email: email,
        password: hash,
      });

      res.status(201).json({
        type: "succes",
        message: "L'utilisateur a été enregistrer avec succès",
        token: jwt.sign(
          {
            userId: user.id,
            username: user.username,
            admin: user.isAdmin,
          },
          process.env.JWT_SECRET_KEY,
          {
            expiresIn: "48h",
          }
        ),
      });
    } catch (e) {
      res.status(400).json({
        type: "error",
        message: e.message,
      });
    }
  } else
    res.status(400).json({
      type: "error",
      message:
        "Le mot de passe doit contenir au moins huit caractères, au moins une lettre et un chiffre",
    });
};
