import BadRequestError from "../errors/BadRequestError.js";
import CoffeeReading from "../models/CoffeeReading.js"
import File from "../models/File.js";
import FortuneTeller from "../models/FortuneTeller.js";
import QuestionService from "./questionService.js";
import AiService from "./aiService.js";
import dotenv from "dotenv";

dotenv.config();

class CoffeeService {
    static async readCoffee(req) {
        const userId = req.userId;
        const fortuneType = "Coffee";
        const {fortuneTeller, answers, uploadedImagePaths} = req.body;

        if(uploadedImagePaths.length < 1 || uploadedImagePaths.length > 3) {
            throw new BadRequestError("File length must be in length 1-3", { code: 'FILES_LENGTH_INVALID' });;
        }
        
        const fortuneTellerConfig = await FortuneTeller.findById(fortuneTeller);
        if(!fortuneTellerConfig && fortuneTellerConfig == fortuneType) 
            throw new BadRequestError("Fortune Teller is not found", { code: 'FORTUNE_TELLER_INVALID' });


        for (const imagePath of uploadedImagePaths) {
            let file = await File.findOne({ url: imagePath, user: userId });
            if (!file) {
                throw new BadRequestError(`Image ${imagePath} is not uploaded by user.`,  { code: 'IMAGE_VIOLATION' });
            }
            file.usedInModel = "CoffeeReading"; 
            await file.save();
        }

        const questions = await QuestionService.getQuestions(fortuneType);

        for (const question of questions) {
            const answer = answers[question.key];
            if (question.required && !answer) {
                throw new Error(`Zorunlu soru cevaplanmadı: ${question.title}`);
            }

            if (question.options.length > 0 && !question.options.includes(answer)) {
                throw new Error(`Geçersiz cevap: ${question.title}`);
            }
        }
        
        const answersString = "Cevaplarım bunlar." + JSON.stringify(answers, null, 2);
        const content = [
            {
                type: "text",
                text: `Kaç fincan fotoğrafı görüyorsun ` ,
            },
            ...uploadedImagePaths.map(url => ({
                type: "image_url",
                image_url: {
                    url: process.env.BASE_URL + url,
                },
            }))
        ]; 

        const aiResponse = await AiService.generateAITextResponse(fortuneTellerConfig.modelSettings, content);
        if(!aiResponse) {
            throw new Error("Fal yorumlanırken bir hata meydana geldi.");
        }

        const coffeeReading = await CoffeeReading.insertOne({
            user: userId,
            fortuneTeller: fortuneTeller,
            fortuneType: fortuneType,
            fortuneText: aiResponse,
            uploadedImagePaths: uploadedImagePaths,
            answers: answers
        });

        if(!coffeeReading) {
            throw new Error("Fal yorumlanırken bir hata meydana geldi.");
        }

        return coffeeReading;
    }
}

export default CoffeeService;