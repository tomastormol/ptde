import React from 'react';
import { Stop } from '../utils/types';

type Props = {
  stops: Stop[];
  onSelectStop: (stopId: string) => void;
};

const StopsList: React.FC<Props> = ({ stops, onSelectStop }) => {
  return (
    <ul>
      {stops.map((stop) => (
        <li key={stop.gtfsId} onClick={() => onSelectStop(stop.gtfsId)}>
          {stop.name}
        </li>
      ))}
    </ul>
  );
};

export default StopsList;