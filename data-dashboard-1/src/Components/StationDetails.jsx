import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

function StationDetails() {
  const { stationId } = useParams(); // Get the station ID from the URL
  const [station, setStation] = useState(null); // State to store station details
  const [loading, setLoading] = useState(true); // State to handle loading
  const [error, setError] = useState(null); // State to handle errors

  const API_KEY = import.meta.env.VITE_APP_API_KEY; // Use your API key from environment variables

  useEffect(() => {
    const fetchStationDetails = async () => {
      try {
        const response = await fetch(
          `https://api.bart.gov/api/stn.aspx?cmd=stninfo&orig=${stationId}&key=${API_KEY}&json=y`
        );
        const data = await response.json();

        if (data.root && data.root.stations && data.root.stations.station) {
          setStation(data.root.stations.station); // Set the station details
        } else {
          setError("Station details not found.");
        }
      } catch (err) {
        setError("Failed to fetch station details.");
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchStationDetails();
  }, [stationId, API_KEY]);

  if (loading) {
    return <div>Loading station details...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!station) {
    return <div>Station not found</div>;
  }


  const introText = station.intro && station.intro["#cdata-section"] ? station.intro["#cdata-section"].trim() : "No additional information available.";

  return (
    <div>
        <a href={`https://www.google.com/maps/@${station.gtfs_latitude},${station.gtfs_longitude},18z`} target="_blank" rel="noopener noreferrer">
            <h1>{station.name} ({station.abbr})</h1>
        </a>
      <p>{station.address}, {station.city}, {station.zipcode}</p>
      <p>{introText}</p>
    </div>
  );
}

export default StationDetails;