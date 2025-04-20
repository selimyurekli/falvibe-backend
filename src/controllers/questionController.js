import QuestionService from "../services/questionService.js"
import asyncHandler from 'express-async-handler';
import { sendSuccess } from '../utils/responseHandler.js';
import BadRequestError from "../errors/BadRequestError.js";

class QuestionController {

    static getQuestions = asyncHandler(async (req, res, next) => {
        console.log(req.query);
        if (!req.query.fortuneType) {
            throw new BadRequestError("fortuneType is required.", { code: 'MISSING_FORTUNE_TYPE' });
        }
        const questions = await QuestionService.getQuestions(req.query.fortuneType);
        
        sendSuccess(res, null, questions, 200);
    });
}

export default QuestionController;