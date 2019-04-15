const stream = require('stream');
const LimitExceededError = require('./LimitExceededError');

class LimitSizeStream extends stream.Transform {
    constructor(options) {
        super(options);

        this.size = 0;
        this.limit = options.limit;
    }

    _transform(chunk, encoding, callback) {
        this.size += chunk.length;

        if (this.size > this.limit) {
            const error = new LimitExceededError();
            callback(error, null)
        } else {
            callback(null, chunk);
        }
    }
}

module.exports = LimitSizeStream;
