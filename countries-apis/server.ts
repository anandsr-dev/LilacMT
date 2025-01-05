import http from 'http';
import expressApp from './app'
import { APP_PORT } from './constants/global';
import { AddressInfo } from 'net';

const server = http.createServer(expressApp);
const appPort = Number(APP_PORT);

function onError(error: Error) {
    console.error(error);
    throw error;
}

function onListening() {
    const addressInfo = server.address() as AddressInfo;
    console.log(`Server listening on port ${addressInfo.port}`);
}

server.listen(appPort);
server.on('error', onError);
server.on('listening', onListening);