import { useEffect, useState } from 'react';
import { fetchTransportData } from '../utils/api';
import { Stop, StopsByRadiusResponse } from '../utils/types';
import { STOPS_BY_RADIUS_QUERY } from '../utils/queries';

const useStops = (lat: number, lon: number, radius: number) => {
  const [stops, setStops] = useState<Stop[]>([]);

  useEffect(() => {
    const loadStops = async () => {
        const query = STOPS_BY_RADIUS_QUERY
        .replace('$lat', lat.toString())
        .replace('$lon', lon.toString())
        .replace('$radius', radius.toString());
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
  }, [lat, lon, radius]);

  return stops;
};

export default useStops;