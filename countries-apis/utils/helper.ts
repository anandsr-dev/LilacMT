// or we can give the required fields to the 3rd party api itself
export const formatData = (data: Country[]) => {
    const formattedData: Formatted_Country[] = [];
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
}