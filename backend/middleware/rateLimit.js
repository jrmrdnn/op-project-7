import rateLimit from "express-rate-limit";

// Defines RateLimit
const MESSAGE_ERROR_RATE_LIMITER = (time = "15") => {
  return {
    type: "error",
    message: `Trop de connexion à partir de cette adresse IP, veuillez réessayer après ${time} minutes`,
  };
};

export const ApiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // limit each IP to 100 requests per windowMs
  message: MESSAGE_ERROR_RATE_LIMITER(),
});

export const AccountLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 15, // start blocking after 15 requests
  message: MESSAGE_ERROR_RATE_LIMITER(),
});
