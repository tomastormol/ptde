import './styles/App.module.scss';
import buttonStyles from './styles/button.module.scss';
import appStyles from './styles/App.module.scss';
import React, { useState, useEffect } from 'react';
import MapComponent from './components/MapComponent';
import useStops from './hooks/useStops';
import InputComponent from './components/InputComponent';

const App: React.FC = () => {
  const simulatedLocation = { lat: 60.170657, lon: 24.941496 };

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTypes, setSelectedTypes] = useState<Set<string>>(new Set([]));

  const stops = useStops(simulatedLocation.lat, simulatedLocation.lon, 1000);
  const [filteredStops, setFilteredStops] = useState(stops);

  useEffect(() => {
    let filtered = stops;

    if (searchTerm.trim() !== '') {
      filtered = filtered.filter(stop =>
        stop.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedTypes.size > 0) {
      filtered = filtered.filter(stop => selectedTypes.has(stop.vehicleMode));
    }

    setFilteredStops(filtered);
  }, [searchTerm, stops, selectedTypes]);

  const handleTypeClick = (type: string) => {
    const newSelectedTypes = new Set(selectedTypes);

    if (newSelectedTypes.has(type)) {
      newSelectedTypes.delete(type);
    } else {
      newSelectedTypes.add(type);
    }

    setSelectedTypes(newSelectedTypes);
  };

  return (
    <>
      <div className={appStyles.controlsContainer}>
        <InputComponent value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        <div className={appStyles.filterButtons}>
          <button
            onClick={() => handleTypeClick('BUS')}
            className={`${buttonStyles.button} ${selectedTypes.has('BUS') ? buttonStyles.active : ''}`}
          >
            Buses
          </button>
          <button
            onClick={() => handleTypeClick('TRAM')}
            className={`${buttonStyles.button} ${selectedTypes.has('TRAM') ? buttonStyles.active : ''}`}
          >
            Trams
          </button>
          <button
            onClick={() => handleTypeClick('RAIL')}
            className={`${buttonStyles.button} ${selectedTypes.has('RAIL') ? buttonStyles.active : ''}`}
          >
            Rails
          </button>
          <button
            onClick={() => handleTypeClick('SUBWAY')}
            className={`${buttonStyles.button} ${selectedTypes.has('SUBWAY') ? buttonStyles.active : ''}`}
          >
            Subway
          </button>
        </div>
      </div>
      <div className={appStyles.mapContainer}>
        <MapComponent stops={filteredStops} simulatedLocation={simulatedLocation} />
      </div>
    </>
  );
};

export default App;