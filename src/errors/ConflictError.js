import BaseError from './BaseError.js';

class ConflictError extends BaseError {
  constructor(message = 'Conflict', details = null) {
    super(message, 409, 'fail', true, details);
  }
}

export default ConflictError;
