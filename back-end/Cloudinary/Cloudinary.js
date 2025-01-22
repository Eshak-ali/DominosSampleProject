const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "Duminos", // Specify the folder name in Cloudinary
    formats: "jpg" || "jpeg" || "png", // Specify allowed file types
    // transformation: [
    //   { width: 300, height: 300, x: 50, y: 50, crop: 'crop' },
    // ],
  },
});

module.exports = { cloudinary, storage };
