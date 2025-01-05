import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import CountryCard from '../components/CountryCard';
import { Link } from 'react-router-dom';

const CountryListPage = () => {
    const [countries, setCountries] = useState([]);
    const [displayedCountries, setDisplayedCountries] = useState([]);
    const [startIndex, setStartIndex] = useState(20);
    const observerRef = useRef(null);

    const [error, setError] = useState(null);

    const BATCH_SIZE = 20;

    const fetchBatch = (startIndex) => {
        return countries.slice(startIndex, startIndex + BATCH_SIZE);
    };

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const { data: response } = await axios.get('http://localhost:4000/countries');
                // console.log(response.data.items)
                setCountries(response.data.items);
                setDisplayedCountries(response.data.items.slice(0, BATCH_SIZE));
            } catch (err) {
                setError('Failed to fetch countries');
            }
        };

        fetchCountries();
    }, []);

    useEffect(() => {
        if (!observerRef.current) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                console.log(entry)
                if (entry.isIntersecting) {
                    setDisplayedCountries(prev =>
                        [...prev, ...fetchBatch(startIndex)]);
                    setStartIndex(prev => prev + BATCH_SIZE);
                }
            },
            { threshold: 1.0 }
        );

        observer.observe(observerRef.current);

        return () => {
            if (observerRef.current) observer.unobserve(observerRef.current);
        };
    }, [countries]);

    if (error) return <div>{error}</div>;

    return (
        <>
            <h1>Countries</h1>
            <div className="country-list">
                {displayedCountries?.map((country, index) => (
                    <Link to={`/countries/${country.cca3}`} key={index} style={{ textDecoration: 'none' }} >
                        <CountryCard
                            name={country.name.common}
                            flag={country.flags.png}
                            region={country.region}
                            timezone={country.timezones[0] || 'UTC'}
                        />
                    </Link>
                ))}
            </div>
            <div ref={observerRef} style={{ height: '1px', width: '100%' }} />
        </>
    )
}

export default CountryListPage;