const express = require('express');
const router = express.Router();
const fileController = require('../controllers/fileController');
const multer = require('multer');


// const upload = multer({ dest: 'public/uploads/' });

// const storage = (req, res, next) => {

//     upload.single('file')(req, res, (err) => {
//         if (err instanceof multer.MulterError) {
//             return res.status(400).json({ error: err.message });
//         } else if (err) {
//             return res.status(500).json({ error: err.message });
//         }

//         next();
//     });
// };

const storage = multer.diskStorage({
    destination: "public/uploads/",
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now();
        cb(null, file.fieldname + "_" + uniqueSuffix + "_" + file.originalname);
    },
});
const upload = multer({ storage }).single("file");




router.post('/upload', upload, fileController.uploadFile);
router.get('/list', fileController.listFiles);
router.get('/:id', fileController.getFileById);
router.put('/:id', upload, fileController.updateFile);
router.delete('/:id', fileController.deleteFile);

module.exports = router;