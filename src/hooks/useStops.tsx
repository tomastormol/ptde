import { useEffect, useState } from 'react';
import { fetchTransportData } from '../utils/api';
import { Stop, StopsByRadiusResponse } from '../utils/types';
import { STOPS_BY_RADIUS_QUERY } from '../utils/queries';

const useStops = (lat: number, lon: number, radius: number) => {
  const [stops, setStops] = useState<Stop[]>([]);

  useEffect(() => {
    const loadStops = async () => {
      try {
        const query = STOPS_BY_RADIUS_QUERY
          .replace('$lat', lat.toString())
          .replace('$lon', lon.toString())
          .replace('$radius', radius.toString());
    
        const result = await fetchTransportData<StopsByRadiusResponse>(query);
    
        if (!result?.data?.stopsByRadius?.edges) {
          console.error('Invalid API response', result);
          return;
        }
    
        const busStops = result.data.stopsByRadius.edges
          .filter((edge) => edge.node.stop.vehicleMode === 'BUS')
          .map((edge) => edge.node.stop);
    
        const uniqueStopsMap = new Map(busStops.map((stop) => [stop.gtfsId, stop]));
        
        setStops(Array.from(uniqueStopsMap.values()));
      } catch (error) {
        console.error('Error fetching stops:', error);
      }
    };

    loadStops();
  }, [lat, lon, radius]);

  return stops;
};

export default useStops;