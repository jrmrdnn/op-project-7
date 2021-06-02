import multer from "multer";
import { v4 as uuidv4 } from "uuid";

// Image format
const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpeg",
  "image/png": "png",
  "image/gif": "gif",
  "image/webp": "webp",
};

// Image storage
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "backend/public/img");
  },
  filename: (req, file, callback) => {
    callback(null, uuidv4() + "." + MIME_TYPES[file.mimetype]);
  },
});

const Multer = multer({ storage: storage }).single("image");

export default Multer;
