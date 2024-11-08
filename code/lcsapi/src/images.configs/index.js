const app = require("../../index");
const createHttpError = require("http-errors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const storageMultiples = multer.diskStorage({
    destination: (req, file, cb) => {
        const destinationPath = `public/${req.body.type}/${req.body.folder}`;
        
        // Check if the directory exists, if not, create it
        if (!fs.existsSync(destinationPath)) {
            fs.mkdirSync(destinationPath, { recursive: true });
        }

        cb(null, destinationPath);
    },
    filename: (req, file, cb) => {
        cb(null, req.body.images + path.extname(file.originalname));
    }
});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const destinationPath = `public/${req.body.type}`;
        
        // Check if the directory exists, if not, create it
        if (!fs.existsSync(destinationPath)) {
            fs.mkdirSync(destinationPath, { recursive: true });
        }

        cb(null, destinationPath);
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });
const uploadMultiples = multer({ storage: storageMultiples });

app.post("/upload/images/upload", upload.single('file'), async (req, res, next) => {
    try {
        
        if (!req.file) {
            throw new createHttpError.BadRequest("No file uploaded");
        }
        
        await app.db
        .table(req.body.type)
        .update({ images:req.body.name + path.extname(req.file?.originalname), updated_at: new Date() })
        .where("id", "=", req.body.selectedImagesConfigs)
        .then(() => {
            res.status(200).json({
                message: "Successfully uploaded",
                status: 200,
                data: {
                    filename: req.file.filename,
                    path: req.file.path,
                    originalname: req.file.originalname,
                    mimetype: req.file.mimetype,
                    size: req.file.size
                }
            });
        });
      
    } catch (error) {
        next(new createHttpError.BadRequest(error.message || "Failed to upload image"));
    }
});
app.get('/images', (req, res) => {
    const directoryPath = path.join(__dirname, '../../public/categories');
    
    fs.readdir(directoryPath, (err, files) => {
        if (err) {
            return res.status(500).send({
                message: "Unable to scan files!",
            });
        }
        
        // Map file names to URLs
        const fileInfos = files.map(file => {
            return {
                name: file,
                url: `/public/${file}`
            };
        });
        
        res.status(200).send(fileInfos);
    });
});

app.post("/multiples/upload/images/upload", uploadMultiples.single('file'), async (req, res, next) => {
    try {
        if (!req.file) {
            throw new createHttpError.BadRequest("No file uploaded");
        }
        
        await app.db
        .table(req.body.type)
        .insert({ images:req.body.images + path.extname(req.file?.originalname), identity:req.body.identity, updated_at: new Date() })
        .then(() => {
            res.status(200).json({
                message: "Successfully uploaded",
                status: 200,
                data: {
                    filename: req.file.filename,
                    path: req.file.path,
                    originalname: req.file.originalname,
                    mimetype: req.file.mimetype,
                    size: req.file.size
                }
            });
        });
      
    } catch (error) {
        next(new createHttpError.BadRequest(error.message || "Failed to upload image"));
    }
});


module.exports = app;
