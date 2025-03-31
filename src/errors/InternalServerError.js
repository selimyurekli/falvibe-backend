import BaseError from './BaseError.js';

class InternalServerError extends BaseError {
  constructor(message = 'Internal Server Error', details = null) {
    super(message, 500, 'error', true, details); // isOperational is true here
  }
}

export default InternalServerError;