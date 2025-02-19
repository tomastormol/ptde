import './styles/App.scss';
import buttonStyles from './styles/Button.module.scss';
import React, { useState, useEffect } from 'react';
import MapComponent from './components/MapComponent';
import useStops from './hooks/useStops';
import InputComponent from './components/InputComponent';

const App: React.FC = () => {
  const simulatedLocation = { lat: 60.170657, lon: 24.941496 };
  const stops = useStops(simulatedLocation.lat, simulatedLocation.lon, 1000);

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredStops, setFilteredStops] = useState(stops);
  const [selectedType, setSelectedType] = useState<string | null>(null);

  useEffect(() => {
    let filtered = stops;

    if (searchTerm.trim() !== '') {
      filtered = filtered.filter(stop =>
        stop.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedType) {
      filtered = filtered.filter(stop => stop.vehicleMode === selectedType);
    }

    setFilteredStops(filtered);
  }, [searchTerm, stops, selectedType]);

  return (
    <>
      <div className="controls-container">
        <div className="search-container">
          <InputComponent value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
        <div className="filter-buttons">
          <button onClick={() => setSelectedType('BUS')} className={buttonStyles.button}>Buses</button>
          <button onClick={() => setSelectedType('TRAM')} className={buttonStyles.button}>Trams</button>
          <button onClick={() => setSelectedType('TRAIN')} className={buttonStyles.button}>Trains</button>
        </div>
      </div>
      <div className="map-container">
        <MapComponent stops={filteredStops} simulatedLocation={simulatedLocation} />
      </div>
    </>
  );
};

export default App;
