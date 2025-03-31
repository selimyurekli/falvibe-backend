import BaseError from './BaseError.js';

class ForbiddenError extends BaseError {
  constructor(message = 'Forbidden', details = null) {
    super(message, 403, 'fail', true, details);
  }
}

export default ForbiddenError;