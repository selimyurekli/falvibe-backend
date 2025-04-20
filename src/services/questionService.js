import FortuneTypeConfig from "../models/FortuneTypeConfig.js";

const allowedFortuneTypes = FortuneTypeConfig.schema.path('fortuneType').enumValues;

class QuestionService {

    static async getQuestions(fortuneType) {
        if(!allowedFortuneTypes.includes(fortuneType)) {
            return [];
        }

        const config = await FortuneTypeConfig.findOne({ fortuneType });

        if (!config) {
            return [];
        }

        return config.questions;
    }
}

export default QuestionService;