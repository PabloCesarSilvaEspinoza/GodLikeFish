const multer = require('multer');
//global.direccion
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, `./public/assets/multimedia/cursos/${global.ultimoCursoID}`),
    filename: (req, file, cb) => cb(null, file.originalname)
});

const upload = multer({storage});

module.exports = upload;