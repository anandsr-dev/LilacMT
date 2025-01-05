import axios from "axios";
import { Request, Response } from "express";
import { REST_COUNTRIES_API } from "../constants/global";
import { sendSuccessResponse } from "../constants/apiResponse";
import { formatData } from "../utils/helper";
import CustomError, { ErrorCodeEnum } from "../constants/errorHandler";

export const fetchAllCountries = async (req: Request, res: Response) => {
    try {
        const response = await axios.get<Country[]>(`${REST_COUNTRIES_API}/all`);
        const formattedData = formatData(response.data);
        sendSuccessResponse(res, 200, "All countries fetched successfully", formattedData);
    } catch (error) {
        new CustomError(ErrorCodeEnum['500_INTERNAL_SERVER_ERROR']).sendErrorResponse(res);
    }
}

export const fetchCountryDetails = async (req: Request, res: Response) => {
    try {
        const response = await axios.get(`${REST_COUNTRIES_API}/alpha/${req.params.code}`);
        sendSuccessResponse(res, 200, "Country details fetched successfully", response.data);
    } catch (error) {
        new CustomError(ErrorCodeEnum['500_INTERNAL_SERVER_ERROR']).sendErrorResponse(res);
    }
}

export const filterByRegion = async (req: Request, res: Response) => {
    try {
        const response = await axios.get(`${REST_COUNTRIES_API}/region/${req.params.region}`);
        const formattedData = formatData(response.data);
        sendSuccessResponse(res, 200, "All countries fetched successfully", formattedData);
    } catch (error) {
        new CustomError(ErrorCodeEnum['500_INTERNAL_SERVER_ERROR']).sendErrorResponse(res);
    }
}

export const search = async (req: Request, res: Response) => {
    try {
        const apiPromises: any = [];
        Object.keys(req.query).forEach((key) => {
            apiPromises.push(axios.get(`${REST_COUNTRIES_API}/${key}/${req.query[key]}`))
        });
        const results = await Promise.all(apiPromises);
        const commonMapping: { [key: string]: number } = {};
        const commonResults: Country[] = [];
        results.forEach((result) => {
            result.data.forEach((res: any) => {
                commonMapping[res.cca3] = commonMapping[res.cca3] ? commonMapping[res.cca3]++ : 1;
                if(commonMapping[res.cca3] === results.length) {
                    commonResults.push(res)
                }
            });
        });
        const formattedData = formatData(commonResults);
        sendSuccessResponse(res, 200, "All countries fetched successfully", formattedData);
    } catch (error) {
        console.log('error', error)
        new CustomError(ErrorCodeEnum['500_INTERNAL_SERVER_ERROR']).sendErrorResponse(res);
    }
}