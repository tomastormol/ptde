import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { fetchStopTimes } from '../utils/api';
import { Stop } from '../utils/types';
import PopupComponent from './PopupComponent';
import ReactDOMServer from 'react-dom/server';
import { FaBusAlt, FaTrain, FaSubway } from 'react-icons/fa';
import { FaTrainTram } from "react-icons/fa6";
import { MdLocationPin } from "react-icons/md";

interface MapComponentProps {
  stops: Stop[];
  simulatedLocation: { lat: number; lon: number };
}

const getIconForStop = (vehicleMode: string): L.DivIcon => {
  let iconComponent;
  switch (vehicleMode) {
    case 'BUS':
      iconComponent = <FaBusAlt size={15} />;
      break;
    case 'TRAM':
      iconComponent = <FaTrainTram size={15} />;
      break;
    case 'RAIL':
      iconComponent = <FaTrain size={15} />;
      break;
    case 'SUBWAY':
      iconComponent = <FaSubway size={15} />;
      break;
    default:
      iconComponent = <FaBusAlt size={15} color="gray" />;
  }

  return L.divIcon({
    html: ReactDOMServer.renderToString(iconComponent),
    className: 'custom-icon',
    iconSize: [30, 30],
    iconAnchor: [15, 15],
  });
};

const MapComponent: React.FC<MapComponentProps> = ({ stops, simulatedLocation }) => {
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = L.map('map').setView([simulatedLocation.lat, simulatedLocation.lon], 17);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
      }).addTo(mapRef.current);

      L.marker([simulatedLocation.lat, simulatedLocation.lon], {
        icon: L.divIcon({
          html: ReactDOMServer.renderToString(<MdLocationPin size={30} color="red" />),
          className: 'custom-icon',
          iconSize: [30, 30],
          iconAnchor: [15, 15],
        }),
      }).addTo(mapRef.current).bindPopup("My mock location");
    }
  }, [simulatedLocation]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    // Limpiar los marcadores anteriores
    map.eachLayer((layer) => {
      if (layer instanceof L.Marker && !layer.getPopup()) {
        map.removeLayer(layer);
      }
    });

    stops.forEach((stop) => {
      const marker = L.marker([stop.lat, stop.lon], {
        icon: getIconForStop(stop.vehicleMode),
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