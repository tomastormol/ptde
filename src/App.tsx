import './App.css';
import React, { useState, useEffect } from 'react';
import { fetchTransportData } from './utils/api';
import { Stop, StopsByRadiusResponse } from './utils/types';
import MapComponent from './components/MapComponent';
import StopsList from './components/StopsList';
import StopDetails from './components/StopDetails';

const App: React.FC = () => {
  const [stops, setStops] = useState<Stop[]>([]);
  const [selectedStop, setSelectedStop] = useState<string | null>(null);
  const simulatedLocation = { lat: 60.170657, lon: 24.941496 };

  useEffect(() => {
    const loadStops = async () => {
      const query = `
        {
          stopsByRadius(lat: 60.170657, lon: 24.941496, radius: 500) {
            edges {
              node {
                stop {
                  gtfsId
                  name
                  lat
                  lon
                  vehicleMode
                }
              }
            }
          }
        }
      `;
      const result = await fetchTransportData<StopsByRadiusResponse>(query);

      const busStops = result.data.stopsByRadius.edges
        .filter((edge) => edge.node.stop.vehicleMode === 'BUS')
        .map((edge) => edge.node.stop);

      const uniqueStopsMap = new Map();
      busStops.forEach((stop) => {
        uniqueStopsMap.set(stop.gtfsId, stop);
      });

      const uniqueStops = Array.from(uniqueStopsMap.values());

      setStops(uniqueStops);
    };

    loadStops();
  }, []);

  return (
    <>
      <h1>Paradas cercanas en Helsinki</h1>
      <MapComponent stops={stops} simulatedLocation={simulatedLocation}/>
      {/* <StopsList stops={stops} onSelectStop={setSelectedStop} /> */}
    </>
  );
};

export default App;