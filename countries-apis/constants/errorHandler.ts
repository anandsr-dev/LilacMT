import { Response } from "express";

export const ErrorMessages: Record<keyof typeof ErrorCodeEnum, string> = {
    '404_NOT_FOUND': 'Not Found',
    '500_INTERNAL_SERVER_ERROR': 'Something went wrong!'
};

export const ErrorCodeEnum = {
    '404_NOT_FOUND': '404_NOT_FOUND',
    '500_INTERNAL_SERVER_ERROR': '500_INTERNAL_SERVER_ERROR'
} as const;

class CustomError extends Error {
    code: keyof typeof ErrorCodeEnum;

    constructor(code: keyof typeof ErrorCodeEnum) {
        super(ErrorMessages[code]);
        this.code = code;
        this.name = this.constructor.name;
    }

    sendErrorResponse(res: Response) {
        const statusCode = Number(this.code.split('_')[0])
        res.status(statusCode).json({
            status: "error",
            error: {
                code: this.code,
                message: this.message
            }
        });
    }
}

export default CustomError;