"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendSuccessResponse = void 0;
const sendSuccessResponse = (res, statusCode, message, data) => {
    const payload = {
        status: "success",
        message
    };
    if (data) {
        payload['data'] = {};
        if (Array.isArray(data)) {
            payload['data']['items'] = data;
        }
        else {
            payload['data']['item'] = data;
        }
    }
    res.status(statusCode).json(payload);
};
exports.sendSuccessResponse = sendSuccessResponse;
