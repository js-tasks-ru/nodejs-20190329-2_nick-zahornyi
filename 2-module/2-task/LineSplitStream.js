const stream = require('stream');
const os = require('os');

class LineSplitStream extends stream.Transform {
    constructor(options) {
        super(options);

        this.deferredString = '';
    }

    _transform(chunk, encoding, callback) {
        const entryString = this.deferredString + chunk.toString();
        const words = entryString.split(os.EOL);
        const lastWord = words.pop();

        words.forEach(word => {
            this.push(word);
        });

        this.deferredString = lastWord;

        callback();
    }

    _flush(callback) {
        if (this.deferredString) {
            this.push(this.deferredString);
        }

        callback();
    }
}

module.exports = LineSplitStream;
