"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorCodeEnum = exports.ErrorMessages = void 0;
exports.ErrorMessages = {
    '404_NOT_FOUND': 'Not Found',
    '500_INTERNAL_SERVER_ERROR': 'Something went wrong!'
};
exports.ErrorCodeEnum = {
    '404_NOT_FOUND': '404_NOT_FOUND',
    '500_INTERNAL_SERVER_ERROR': '500_INTERNAL_SERVER_ERROR'
};
class CustomError extends Error {
    constructor(code) {
        super(exports.ErrorMessages[code]);
        this.code = code;
        this.name = this.constructor.name;
    }
    sendErrorResponse(res) {
        const statusCode = Number(this.code.split('_')[0]);
        res.status(statusCode).json({
            status: "error",
            error: {
                code: this.code,
                message: this.message
            }
        });
    }
}
exports.default = CustomError;
