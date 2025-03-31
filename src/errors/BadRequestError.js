import BaseError from './BaseError.js';

class BadRequestError extends BaseError {
  constructor(message = 'Bad Request', details = null) {
    super(message, 400, 'fail', true, details);
  }
}

export default BadRequestError;
