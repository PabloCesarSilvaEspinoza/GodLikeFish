const multer = require('multer');
//global.direccion
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, `public/assets/multimedia/cursos/${global.cursoIdEditar}`),
    filename: (req, file, cb) => cb(null, file.originalname)
});

const uploadEdit = multer({storage});

module.exports = uploadEdit;