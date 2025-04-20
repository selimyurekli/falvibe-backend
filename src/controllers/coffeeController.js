import asyncHandler from 'express-async-handler';
import { sendSuccess } from '../utils/responseHandler.js';
import CoffeeService from '../services/coffeeService.js';

class CoffeeController {

    static readCoffeeReading = asyncHandler(async (req, res, next) => {
        const coffeeReading = await CoffeeService.readCoffee(req);
    
        sendSuccess(res, null, coffeeReading, 200);
    });
}

export default CoffeeController;