import { sendError } from '../utils/responseHandler.js';
import BaseError from '../errors/BaseError.js';

const globalErrorHandler = (err, req, res, next) => {

  if (err instanceof BaseError && err.isOperational) {
    console.warn(`OPERATIONAL ERROR: ${err.constructor.name} | Status: ${err.statusCode} | Message: ${err.message}`, err.details ? `| Details: ${JSON.stringify(err.details)}` : '');

    return sendError(res, err.message, err.details, err.statusCode);
  }

  console.error('💥 UNHANDLED NON-OPERATIONAL ERROR 💥');
  console.error('Error Name:', err.name);
  console.error('Error Message:', err.message);
  console.error('Error Stack:', err.stack);

  const statusCode = 500;
  let clientMessage = 'An unexpected internal server error occurred. Please try again later.';
  let clientErrorDetails = { code: 'INTERNAL_SERVER_ERROR' };

  if (process.env.NODE_ENV === 'development') {
      clientMessage = `[DEV] Unhandled Error: ${err.name} - ${err.message}`; // Show original error type/message in dev response
      clientErrorDetails.originalErrorName = err.name;
  }

  sendError(res, clientMessage, clientErrorDetails, statusCode);
};

export default globalErrorHandler;