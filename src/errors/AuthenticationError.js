import BaseError from './BaseError.js';

class AuthenticationError extends BaseError {
  constructor(message = 'Authentication Required', details = null) {
    super(message, 401, 'fail', true, details);
  }
}

export default AuthenticationError;
