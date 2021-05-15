const multer = require('multer');

const storage = multer.diskStorage({
    destination: cb => cb(null, global.direccion),
    filename: (file, cb) => cb(null, file.originalname)
});

const upload = multer({storage});

module.exports = upload;