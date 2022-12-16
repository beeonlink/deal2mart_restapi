const util = require("util");
const path = require("path");
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require("multer");
// var storage = multer.diskStorage({
//   destination: (req, file, callback) => {
//     callback(null, path.join(`${__dirname}/../../media/images`));
//   },
//   filename: (req, file, callback) => {
//     const match = ["image/png", "image/jpeg"];

//     if (match.indexOf(file.mimetype) === -1) {
//       var message = `${file.originalname} is invalid. Only accept png/jpeg.`;
//       return callback(message, null);
//     }

//     var filename = `${Date.now()}-bezkoder-${file.originalname}`;
//     callback(null, filename);
//   },
// });

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'media',
    format: async (req, file) => 'png', // supports promises as well
    public_id: (req, file) => file.public_id,
    transformation: [{ width: 500, height: 500, crop: 'limit' }],
  },
});

var uploadFile = multer({ storage: storage }).single("image");
var uploadFileMiddleware = util.promisify(uploadFile);
module.exports = uploadFileMiddleware;
