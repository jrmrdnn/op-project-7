import jwt from "jsonwebtoken";

const VerifUser = async (req, res, next) => {
  try {
    const { userId, admin } = jwt.verify(
      req.headers.authorization.split(" ")[1],
      process.env.JWT_SECRET_KEY
    );

    req.userId = userId;
    req.admin = admin;
    next();
  } catch {
    res.status(401).json({
      type: "error",
      message: "Le token n'est pas valide.",
    });
  }
};

export default VerifUser;
