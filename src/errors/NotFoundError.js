import BaseError from './BaseError.js';

class NotFoundError extends BaseError {
  constructor(message = 'Resource Not Found', details = null) {
    super(message, 404, 'fail', true, details);
  }
}

export default NotFoundError;
