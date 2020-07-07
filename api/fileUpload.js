var multer = require('multer');
const util = require("util");

var storage = multer.diskStorage({
    destination: async (req, file, cb) => {
        if (file.mimetype !== 'image/gif' && file.mimetype !== 'image/png' && file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/svg' && file.mimetype !== 'video/mp4' && file.mimetype !== 'video/3gpp') {
            cb("Invalid File Format");
        }
        cb(null, './public');
    },
    filename: async (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

var fileUploader = multer({
    storage: storage,
    limits: {
        files: 1,
        fileSize: 3 * 1024 * 1024, 
        }
})

exports.upload = async (req, res) => {
    console.log("fileUploade/upload:start")
    let filename
    try {
        const uploader = util.promisify(fileUploader.any());
        await uploader(req, res);
        filename = req.files[0].filename;
        let url = `http:/localhost:8080/api/download/${filename}`
        return url
    } catch (err) {
        throw new Error(err)
    }
}