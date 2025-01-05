import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const CountryDetailsPage = () => {
    const { countryCode } = useParams();
    const [country, setCountry] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCountryDetails = async () => {
            try {
                const { data: response } = await axios.get(
                    `http://localhost:4000/countries/${countryCode}`
                );
                setCountry(response.data.items[0]); // API returns an array for `alpha` endpoint
            } catch (err) {
                setError('Failed to fetch country details');
            }
        };

        fetchCountryDetails();
    }, [countryCode]);

    if (error) return <div>{error}</div>;
    if (!country) return <div>Loading...</div>;

    return (
        <div className="country-details">
            <img src={country.flags.png} alt={`${country.name.common}'s flag`} />
            <h1>{country.name.common}</h1>
            <p><strong>Region:</strong> {country.region}</p>
            <p><strong>Subregion:</strong> {country.subregion}</p>
            <p><strong>Capital:</strong> {country.capital?.join(', ') || 'N/A'}</p>
            <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
            <p><strong>Languages:</strong> {Object.values(country.languages).join(', ')}</p>
            <p><strong>Currencies:</strong> {Object.values(country.currencies)
                .map(currency => `${currency.name} (${currency.symbol})`)
                .join(', ')}</p>
            <p><strong>Timezones:</strong> {country.timezones.join(', ')}</p>
        </div>
    );
};

export default CountryDetailsPage;