const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
})

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "Mascotas Perdidas LP",
        allowedFormats: ["jpeg", "png", "jpg", "gif"],
    }   
});

const storageFound = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "Mascotas Encontradas LP",
        allowedFormats: ["jpeg", "png", "jpg", "gif"],
    }   
});

module.exports = {
    cloudinary,
    storage,
    storageFound
}