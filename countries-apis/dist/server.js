"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const app_1 = __importDefault(require("./app"));
const global_1 = require("./constants/global");
const server = http_1.default.createServer(app_1.default);
const appPort = Number(global_1.APP_PORT);
function onError(error) {
    console.error(error);
    throw error;
}
function onListening() {
    const addressInfo = server.address();
    console.log(`Server listening on port ${addressInfo.port}`);
}
server.listen(appPort);
server.on('error', onError);
server.on('listening', onListening);
