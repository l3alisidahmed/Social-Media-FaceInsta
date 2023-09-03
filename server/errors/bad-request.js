
class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.name = 'BadRequestError';
    this.statusCode = 400; // Bad Request Status Code
  }
}

module.exports = BadRequestError