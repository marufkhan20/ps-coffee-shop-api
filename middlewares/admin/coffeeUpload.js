// internal imports
const uploader = require("../../utils/fileUploader");

const coffeeUpload = (req, res, next) => {
  const upload = uploader(
    "coffees",
    ["image/jpeg", "image/jpg", "image/png"],
    10000000,
    "Only .jpeg .jpg or .png format allowed!"
  );

  //   call the middleware function
  upload.array("images")(req, res, (err) => {
    if (err) {
      res.status(500).json({
        errors: {
          coffee: {
            msg: err.message,
          },
        },
      });
    } else {
      next();
    }
  });
};

module.exports = coffeeUpload;
