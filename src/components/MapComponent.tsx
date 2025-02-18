import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import redPin from '../assets/red-pin.png';
import busPin from '../assets/bus-pin.png';

interface MapComponentProps {
  stops: Array<{
    gtfsId: string;
    name: string;
    lat: number;
    lon: number;
  }>;
  simulatedLocation: { lat: number; lon: number };
}

const MapComponent: React.FC<MapComponentProps> = ({ stops, simulatedLocation }) => {
  useEffect(() => {
    const map = L.map('map').setView([simulatedLocation.lat, simulatedLocation.lon], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(map);

    L.marker([simulatedLocation.lat, simulatedLocation.lon], {
      icon: L.icon({ 
        iconUrl: redPin,
        iconSize: [30, 30],
      }),
    }).addTo(map).bindPopup("Ubicación Simulada");

    stops.forEach((stop) => {
      L.marker([stop.lat, stop.lon], {
        icon: L.icon({ 
          iconUrl: busPin,
          iconSize: [30, 30],
        }),
      }).addTo(map)
        .bindPopup(`<b>${stop.name}</b><br>ID: ${stop.gtfsId}`);
    });

    return () => {
      map.remove();
    };
  }, [stops, simulatedLocation]);

  return <div id="map" style={{ height: '500px', width: '100%' }} />;
};

export default MapComponent;