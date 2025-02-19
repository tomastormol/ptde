import './App.css';
import React, { useState, useEffect } from 'react';
import MapComponent from './components/MapComponent';
import useStops from './hooks/useStops';

const App: React.FC = () => {
  const simulatedLocation = { lat: 60.170657, lon: 24.941496 };
  const stops = useStops(simulatedLocation.lat, simulatedLocation.lon, 1000);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredStops, setFilteredStops] = useState(stops);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredStops(stops);
    } else {
      setFilteredStops(
        stops.filter(stop =>
          stop.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [searchTerm, stops]);

  return (
    <>
      <input
        type="text"
        placeholder="Search for a stop..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      <MapComponent stops={filteredStops} simulatedLocation={simulatedLocation} />
    </>
  );
};

export default App;