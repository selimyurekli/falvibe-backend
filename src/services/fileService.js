import File from "../models/File.js"
import BadRequestError from "../errors/BadRequestError.js";


class FileService {
    static async uploadFile(req) {
        const file = req.file;
        console.log(req.file);

        if (!file) {
            throw new BadRequestError("File is required.", { code: 'MISSING_FILE_TO_UPLOAD' });;
        }

        const newImage = await File.create({
            user: req.userId,
            url: `/uploads/${file.filename}`,
            originalName: file.originalname,
            mimeType: file.mimetype,
            size: file.size
        });

        return newImage.url;
    }
}

export default FileService;