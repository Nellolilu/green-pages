const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "companylogos",
    // allowedFormats: ["jpg", "png"],
    // transformation: [{ width: 200, height: 200, crop: "limit" }],

    // params: async (req, file) => {
    //   // async code using `req` and `file`
    //   // ...
    //   return {
    //     folder: 'folder_name',
    //     format: 'jpeg',
    //     public_id: 'some_unique_id',
    //   };
    // },
  },
});

const parser = multer({ storage });

module.exports = parser;
