const { CustomError } = require("../errors");

const errorHandler = (err, req, res, next) => {
  const customResponse = {
    message: err.message || 'Internal Server Error!',
    status: err.statusCode || 500
  }
  console.log('inside error handler');

  if(err instanceof CustomError) {
    customResponse.message = err.message;
    customResponse.status = err.statusCode;
  }

  res.status(customResponse.status).json({ 
    success: false, 
    message: customResponse.message 
  });
}

module.exports = errorHandler