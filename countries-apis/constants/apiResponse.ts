import { Response } from "express";
import { EApiResponse } from "../types/common";

export const sendSuccessResponse = <T>(res: Response, statusCode: number, message: string, data?: T) => {
    const payload: EApiResponse<T> = {
        status: "success",
        message
    }
    if(data) {
        payload['data'] = {};
        if(Array.isArray(data)) {
            payload['data']['items'] = data;
        } else {
            payload['data']['item'] = data;
        }
    }
    res.status(statusCode).json(payload);
}