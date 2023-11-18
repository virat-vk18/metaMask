const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

router.route('/').post(async (req, res, next) => {
    try {
        // Set up a storage engine for multer
        const storage = multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, path.join(__dirname, '..', 'public', 'images')); // Files will be stored in the 'uploads' directory
            },
            filename: (req, file, cb) => {
                const imgName = file.fieldname + '_' + Date.now() + path.extname(file.originalname);
                cb(null, imgName);
            },
        });

        const upload = multer({
            storage: storage,
            fileFilter: (req, file, cb) => {
                let fileTypes = /jpg|jpeg|png/;
                let mimiType = fileTypes.test(file.mimetype);
                let extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
                if (mimiType && extname) {
                    return cb(null, true);
                }
                return cb('This file is not supported');
            },
        }).single('file');

        // Route to handle file uploads
        upload(req, res, (err) => {
            if (err) {
                console.error(err);
                res.status(400).json({ message: "File upload failed", error: err });
            } else {
                res.status(201).json({ message: "Image uploaded successfully" });
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error", error: error });
    }
});

module.exports = router;
