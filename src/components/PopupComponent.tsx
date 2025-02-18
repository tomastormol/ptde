// PopupContent.tsx
import React from 'react';
import { Stop, StopTime } from '../utils/types';

interface PopupContentProps {
  stop: Stop;
  times: StopTime[];
}

const PopupContent: React.FC<PopupContentProps> = ({ stop, times }) => {
  return (
    <div>
      <b>{stop.name}</b><br />
      {/* ID: {stop.gtfsId}<br /> */}
      {times && times.length > 0 ? (
        <>
          Upcoming buses:<br />
          {times.map((time, index) => {
            const arrivalTime = new Date(new Date().getTime() + time.realtimeArrival * 1000);
            const formattedTime = arrivalTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            return (
              <div key={index}>
                {time.trip.route.shortName} - {time.headsign} ({formattedTime})
              </div>
            );
          })}
        </>
      ) : (
        "No timetables available"
      )}
    </div>
  );
};

export default PopupContent;