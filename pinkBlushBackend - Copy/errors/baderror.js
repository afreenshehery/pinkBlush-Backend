'use strict';
class BadError extends Error {
    constructor(message, extra) {
        super();
        Error.captureStackTrace(this, this.constructor);
        this.name = 'BadError';
        this.message = message;
        this.json = { message: message, status: 400 };
        this.status = 400;
        if (extra) {
            this.extra = extra;
        }
    }
}

module.exports = BadError