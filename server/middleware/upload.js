const multer = require("multer");
//Single file Upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname == "profileimg") {
      cb(null, "./public/Uploads/ProfileImages");
    } else if (file.fieldname == "resume") {
      cb(null, "./public/Uploads/Resume");
    }
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const fileFilter = (req, file, callback) => {
  if (file.fieldname == "profileimg") {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      callback(null, true);
    } else {
      console.log("uplaod png and jpg file only");
      callback(null, false);
    }
  } else if (file.fieldname == "resume") {
    if (file.mimetype == "application/pdf") {
      callback(null, true);
    } else {
      console.log("uplaod pdf file only");
      callback(null, false);
    }
  }
};
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 1,
  },
  fileFilter: fileFilter,
});
module.exports = upload;
