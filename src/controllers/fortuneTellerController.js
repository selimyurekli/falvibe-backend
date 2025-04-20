import FortuneTellerService from "../services/fortuneTellerService.js"
import asyncHandler from 'express-async-handler';
import { sendSuccess } from '../utils/responseHandler.js';

class FortuneTellerController {

    static getAllFortuneTellers = asyncHandler(async (req, res, next) => {
        const fortuneTellers = await FortuneTellerService.getAllFortuneTellers(req);
    
        sendSuccess(res, null, fortuneTellers, 200);
    });
}

export default FortuneTellerController;