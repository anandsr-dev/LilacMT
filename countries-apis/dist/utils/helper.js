"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatData = void 0;
// or we can give the required fields to the 3rd party api itself
const formatData = (data) => {
    const formattedData = [];
    data.forEach((datum) => {
        formattedData.push({
            name: datum.name,
            population: datum.population,
            flags: datum.flags,
            region: datum.region,
            currencies: datum.currencies,
            timezones: datum.timezones,
            cca3: datum.cca3
        });
    });
    return formattedData;
};
exports.formatData = formatData;
