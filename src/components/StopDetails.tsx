import React, { useEffect, useState } from 'react';
import { fetchStopTimes } from '../utils/api';
import { StopTimesResponse } from '../utils/types';

type Props = {
  stopId: string;
};

const StopDetails: React.FC<Props> = ({ stopId }) => {
  const [stopTimes, setStopTimes] = useState<StopTimesResponse | null>(null);

  useEffect(() => {
    fetchStopTimes(stopId).then(setStopTimes).catch(console.error);
  }, [stopId]);

  if (!stopTimes) return <p>Loading...</p>;

  return (
    <div>
      <h2>{stopTimes.data.stop.name}</h2>
      <ul>
        {stopTimes.data.stop.stoptimesWithoutPatterns.map((time, index) => (
          <li key={index}>
            {time.headsign} - Arrive {Math.floor(time.realtimeArrival / 60)} min ({time.trip.route.shortName})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StopDetails;