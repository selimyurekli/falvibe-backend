import FortuneTeller from "../models/FortuneTeller.js";


class FortuneTellerService {

    static async getAllFortuneTellers(req) {
        const fortuneType = req.params.fortuneType, filter = {}, sort = { createdAt: 1 };
    
        if (fortuneType) {
          const validTypes = FortuneTeller.schema.path('fortuneType').enumValues;
    
          if (validTypes.includes(fortuneType)) {
            filter.fortuneType = fortuneType; // Geçerliyse filtreye ekle
          } else {
            throw new BadRequestError(
              `Invalid fortune type provided: ${fortuneType}. Valid types are: ${validTypes.join(', ')}`,
              { code: 'INVALID_FORTUNE_TYPE' }
            );
          }
        }
    
        const fortuneTellers = await FortuneTeller.find(filter).sort(sort).select("-modelSettings");

        return fortuneTellers;
    }
}

export default FortuneTellerService