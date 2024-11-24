const { v2: cloudinary } = require('cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const dotenv = require('dotenv');
const multer = require('multer');
dotenv.config();

// Cấu hình Cloudinary với các thông tin xác thực từ biến môi trường
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Cấu hình Multer để lưu trữ lên Cloudinary
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    allowedFormats: ['jpg', 'png'],
    params: {
        folder: 'image', // Thư mục trên Cloudinary để lưu trữ hình ảnh
    },
});

const upload = multer({ storage: storage });

module.exports = upload;
