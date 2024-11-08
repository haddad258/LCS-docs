const app = require("../../../index");
const createHttpError = require("http-errors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const authJwt = require("../../middlewares/authCustomer");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const destinationPath = `public/${req.body.entity}`;

        // Check if the directory exists, if not, create it
        if (!fs.existsSync(destinationPath)) {
            fs.mkdirSync(destinationPath, { recursive: true });
        }

        cb(null, destinationPath);
    },
    filename: (req, file, cb) => {
        // Generate a filename with req.userId and a random number
        const uniqueFileName = `${req.body.entity}_${Math.floor(Math.random() * 10000)}${path.extname(file.originalname)}`;
        cb(null, uniqueFileName);
    }
});

const upload = multer({ storage: storage });

app.post("/api/mobiles/customers/images/upload", upload.single('files'), [authJwt.verifyToken], async (req, res, next) => {
    try {
        if (!req.file) {
            throw new createHttpError.BadRequest("No file uploaded");
        }
        // Save file details in the database
        await app.db
            .table("customerimages")
            .insert({
                identity:req.userId,
                images: req.file.filename, // use the generated filename
                url: req.file.filename, // use the generated filename
                updated_at: new Date()
            })
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

module.exports = app;
