class BaseEror extends Error {
  constructor(message, code = 500) {
    super();
    this.message = message;
    this.code = code;
  }
}

class BadRequest extends BaseEror {}

module.exports = { BadRequest };
