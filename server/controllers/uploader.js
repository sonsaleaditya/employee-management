const cloudinary = require('cloudinary').v2;

const uploadFile = async (filePath,folderName) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: folderName
    });
    return result.secure_url;
  } catch (error) {
    throw new Error("Error occurred while uploading image: " + error.message);
  }
};

module.exports = uploadFile;
