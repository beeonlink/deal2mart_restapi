const upload = require("../../middleware/upload");

const multipleUpload = async (req, res, next) => {
  try {
    await upload(req, res);
    next();
  } catch (error) {
    console.log(error);
    return res.send(`Error when trying upload file: ${error}`);
  }
};

module.exports = {
  multipleUpload: multipleUpload,
};
