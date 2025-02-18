import './App.css';
import React from 'react';
import MapComponent from './components/MapComponent';
import useStops from './hooks/useStops';

const App: React.FC = () => {
  const simulatedLocation = { lat: 60.170657, lon: 24.941496 };
  const stops = useStops(simulatedLocation.lat, simulatedLocation.lon, 1000);

  return (
    <>
      <h1>Stops near me</h1>
      <MapComponent stops={stops} simulatedLocation={simulatedLocation} />
    </>
  );
};

export default App;