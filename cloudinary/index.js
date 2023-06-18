const cloudinary=require('cloudinary').v2
const {CloudinaryStorage}=require('multer-storage-cloudinary')

cloudinary.config({
    cloud_name: "dzj5wwbfm",
    api_key: "632964164347667",
    api_secret: "8OnujYpUGvmtIf1q3vJTUexlUG0"
});

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'YelpCamp',
        allowedFormats: ['jpeg', 'png', 'jpg']
    }
});

module.exports = {
    cloudinary,
    storage
}