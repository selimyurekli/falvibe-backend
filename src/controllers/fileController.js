import asyncHandler from 'express-async-handler';
import { sendSuccess } from '../utils/responseHandler.js';
import FileService from '../services/fileService.js';

class FileController {

    static uploadFile = asyncHandler(async (req, res, next) => {
        const url = await FileService.uploadFile(req);
    
        sendSuccess(res, "Successfully uploaded.", url, 200);
    });
}

export default FileController;