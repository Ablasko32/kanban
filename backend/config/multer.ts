import multer from "multer";

// Multer conifg
const diskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toLocaleDateString() + file.originalname);
  },
});

export const upload = multer({
  storage: diskStorage,
});
