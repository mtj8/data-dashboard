import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios';

import Card from './Components/Card.jsx'
import Data from './Components/Data.jsx'

function App() {
  const API_KEY = import.meta.env.VITE_APP_API_KEY;
  const [stationData, setStationData] = useState(null)
  const [northernmostStation, setNorthernmostStation] = useState(null)
  const [southernmostStation, setSouthernmostStation] = useState(null)
  
  useEffect(() => {
    const getData = async () => {
      const response = await fetch(`https://api.bart.gov/api/stn.aspx?cmd=stns&key=${API_KEY}&json=y`);
      const data = await response.json();
      
      // Find northernmost and southernmost stations once
      const stations = data.root.stations.station;
      setNorthernmostStation(stations.reduce((north, station) => 
        parseFloat(station.gtfs_latitude) > parseFloat(north.gtfs_latitude) ? station : north
      ));
      setSouthernmostStation(stations.reduce((south, station) => 
        parseFloat(station.gtfs_latitude) < parseFloat(south.gtfs_latitude) ? station : south
      ));
      
      console.log(northernmostStation);
      setStationData(stations);
    };
    getData();
  }, []);

  return (
    <div>
      <div className="whole-page">
        <div className="header">
          <h1>BART Station Finder</h1>
        </div>
        <div className="card-container">
          <Card stat={stationData ? stationData.length : 0} description="Total Stations" />
          <Card stat={northernmostStation ? northernmostStation.name : "N/A"} description="Northernmost Station" />
          <Card stat={southernmostStation ? southernmostStation.name : "N/A"} description="Southernmost Station" />
        </div>
        <Data data={stationData}/>
      </div>
    </div>  
  )
}

export default App