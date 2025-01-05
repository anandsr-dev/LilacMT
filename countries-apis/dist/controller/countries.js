"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.search = exports.filterByRegion = exports.fetchCountryDetails = exports.fetchAllCountries = void 0;
const axios_1 = __importDefault(require("axios"));
const global_1 = require("../constants/global");
const apiResponse_1 = require("../constants/apiResponse");
const helper_1 = require("../utils/helper");
const errorHandler_1 = __importStar(require("../constants/errorHandler"));
const fetchAllCountries = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get(`${global_1.REST_COUNTRIES_API}/all`);
        const formattedData = (0, helper_1.formatData)(response.data);
        (0, apiResponse_1.sendSuccessResponse)(res, 200, "All countries fetched successfully", formattedData);
    }
    catch (error) {
        new errorHandler_1.default(errorHandler_1.ErrorCodeEnum['500_INTERNAL_SERVER_ERROR']).sendErrorResponse(res);
    }
});
exports.fetchAllCountries = fetchAllCountries;
const fetchCountryDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get(`${global_1.REST_COUNTRIES_API}/alpha/${req.params.code}`);
        (0, apiResponse_1.sendSuccessResponse)(res, 200, "Country details fetched successfully", response.data);
    }
    catch (error) {
        new errorHandler_1.default(errorHandler_1.ErrorCodeEnum['500_INTERNAL_SERVER_ERROR']).sendErrorResponse(res);
    }
});
exports.fetchCountryDetails = fetchCountryDetails;
const filterByRegion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get(`${global_1.REST_COUNTRIES_API}/region/${req.params.region}`);
        const formattedData = (0, helper_1.formatData)(response.data);
        (0, apiResponse_1.sendSuccessResponse)(res, 200, "All countries fetched successfully", formattedData);
    }
    catch (error) {
        new errorHandler_1.default(errorHandler_1.ErrorCodeEnum['500_INTERNAL_SERVER_ERROR']).sendErrorResponse(res);
    }
});
exports.filterByRegion = filterByRegion;
const search = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const apiPromises = [];
        Object.keys(req.query).forEach((key) => {
            apiPromises.push(axios_1.default.get(`${global_1.REST_COUNTRIES_API}/${key}/${req.query[key]}`));
        });
        const results = yield Promise.all(apiPromises);
        const commonMapping = {};
        const commonResults = [];
        results.forEach((result) => {
            console.log('result', result);
            result.data.forEach((res) => {
                console.log('res', res);
                commonMapping[res.cca3] = commonMapping[res.cca3] ? commonMapping[res.cca3]++ : 1;
                if (commonMapping[res.cca3] === results.length) {
                    commonResults.push(res);
                }
            });
        });
        const formattedData = (0, helper_1.formatData)(commonResults);
        (0, apiResponse_1.sendSuccessResponse)(res, 200, "All countries fetched successfully", formattedData);
    }
    catch (error) {
        console.log('error', error);
        new errorHandler_1.default(errorHandler_1.ErrorCodeEnum['500_INTERNAL_SERVER_ERROR']).sendErrorResponse(res);
    }
});
exports.search = search;
