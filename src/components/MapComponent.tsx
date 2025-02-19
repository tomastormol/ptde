import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { fetchStopTimes } from '../utils/api';
import { Stop } from '../utils/types';
import PopupComponent from './PopupComponent';
import ReactDOMServer from 'react-dom/server';

import redPin from '../assets/red-pin.png';
import busPin from '../assets/bus-pin.png';

interface MapComponentProps {
  stops: Stop[];
  simulatedLocation: { lat: number; lon: number };
}

const MapComponent: React.FC<MapComponentProps> = ({ stops, simulatedLocation }) => {
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = L.map('map').setView([simulatedLocation.lat, simulatedLocation.lon], 17);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
      }).addTo(mapRef.current);

      L.marker([simulatedLocation.lat, simulatedLocation.lon], {
        icon: L.icon({ 
          iconUrl: redPin,
          iconSize: [30, 30],
        }),
      }).addTo(mapRef.current).bindPopup("My mock location");
    }
  }, [simulatedLocation]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    map.eachLayer((layer) => {
      if (layer instanceof L.Marker && !layer.getPopup()) {
        map.removeLayer(layer);
      }
    });

    stops.forEach((stop) => {
      const marker = L.marker([stop.lat, stop.lon], {
        icon: L.icon({ 
          iconUrl: busPin,
          iconSize: [30, 30],
        }),
      }).addTo(map);

      marker.on('click', async () => {
        try {
          const times = await fetchStopTimes(stop.gtfsId);

          const popupContent = ReactDOMServer.renderToString(
            <PopupComponent stop={stop} times={times.data.stop.stoptimesWithoutPatterns} />
          );
          marker.bindPopup(popupContent).openPopup();
        } catch (error) {
          console.log(error);
        }
      });
    });
  }, [stops]);

  return <div id="map" style={{ height: '100%', width: '100%' }} />;
};

export default MapComponent;
