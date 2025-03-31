const sendSuccess = (res, message, data = null, statusCode = 200) => {
    res.status(statusCode).json({
      success: true,
      message,
      data,
      error: null,
    });
  };
  
const sendError = (res, message, errorDetails = null, statusCode = 500) => {
    const errorResponse = {
      success: false,
      message,
      data: null,
      error: errorDetails,
    };
  
    res.status(statusCode).json(errorResponse);
};
  
export { sendSuccess, sendError };