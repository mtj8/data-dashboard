import { useState, useEffect } from 'react';
import './Data.css';

// notes:
// show location on google maps with https://www.google.com/maps/@{lat},{long},{zoom}z

const Data = ({ data }) => {
    const [input, setInput] = useState("")

    // filter stations with search bar
    const [filteredStations, setFilteredStations] = useState(data)
    const filterStations = (textInput, cityInput) => {
        let filtered = data;

        if (textInput) {
            filtered = filtered.filter(station => station.name.toLowerCase().includes(textInput.toLowerCase()));
        }
        if (cityInput) {
            filtered = filtered.filter(station => station.city === cityInput);
        }

        setFilteredStations(filtered);
    }

    const filterText = (textInput) => {
        setInput(textInput);
        filterStations(textInput, selectedCity);
    }

    const filterCity = (city) => {
        setSelectedCity(city);
        filterStations(input, city);
    }

    // get all cities
    const [selectedCity, setSelectedCity] = useState("");
    const [cities, setCities] = useState([]);
    useEffect(() => {
        if (data) {
            // get unique cities
            const uniqueCities = [...new Set(data.map(station => station.city))];
            setCities(uniqueCities.sort());
        }
    }, [data]);

    return (
        <div className="data">
            <div className="search">
                <input onChange={(input) => filterText(input.target.value)} type="text" value={input} placeholder="Search for a route..." />
                <select onChange={(input) => filterCity(input.target.value)} value={selectedCity}>
                    <option value="">All Cities</option>
                    {cities.map((city, index) => (
                        <option key={index} value={city}>{city}</option>
                    ))}
                </select>
            </div>
            <div className="station-container">
                {input.length > 0 || selectedCity !== ""
                    ? filteredStations.map((station, index) => (
                        <div key={index} className="station">
                            <p>{station.abbr}</p>
                            <p>{station.city}</p>
                            <a href={`https://www.google.com/maps/@${station.gtfs_latitude},${station.gtfs_longitude},18z`} target="_blank" rel="noopener noreferrer">
                                <p>{station.name}</p>
                            </a>
                        </div>
                    ))
                : data && data.map((station, index) => (
                    <div key={index} className="station">
                        <p>{station.abbr}</p>
                        <p>{station.city}</p>
                        <a href={`https://www.google.com/maps/@${station.gtfs_latitude},${station.gtfs_longitude},18z`} target="_blank" rel="noopener noreferrer">
                            <p>{station.name}</p>
                        </a>

                    </div>
                )
                )}
            </div>
        </div>
    )
}

export default Data;