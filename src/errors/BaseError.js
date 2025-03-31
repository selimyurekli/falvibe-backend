class BaseError extends Error {
    constructor(message, statusCode, status, isOperational, details = null) {
      super(message);
  
      this.statusCode = statusCode;
      this.status = status;
      this.isOperational = isOperational;
      this.details = details;
  
      Error.captureStackTrace(this, this.constructor);
    }
}
  
export default BaseError;
