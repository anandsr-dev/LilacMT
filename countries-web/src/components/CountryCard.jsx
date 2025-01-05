import './CountryCard.css';

const getCurrentTime = (utcOffset) => {
  try {
    // Parse offset (e.g., "UTC-04:00" -> -4 hours)
    const match = utcOffset.match(/UTC([+-])(\d{2}):?(\d{2})?/);
    if (!match) throw new Error('Invalid offset');

    const sign = match[1] === '+' ? 1 : -1;
    const hours = parseInt(match[2], 10);
    const minutes = parseInt(match[3] || '0', 10);

    // Create a new Date and apply the offset
    const now = new Date();
    now.setUTCHours(now.getUTCHours() + sign * hours);
    now.setUTCMinutes(now.getUTCMinutes() + sign * minutes);

    // Return the time in 12-hour format
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
  } catch (error) {
    console.error(error);
    return 'Time unavailable';
  }
};


const CountryCard = ({ name, flag, region, timezone }) => (
    <div className="card">
        <img src={flag} alt={`${name}'s flag`} className="flag" />
        <h3>{name}</h3>
        <p>Region: {region}</p>
        <p>Current Time: {getCurrentTime(timezone)}</p>
    </div>
);

export default CountryCard;