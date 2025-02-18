export interface Stop {
    gtfsId: string;
    name: string;
    lat: number;
    lon: number;
    vehicleMode: string;
  }
  
  export interface StopsByRadiusResponse {
    data: {
      stopsByRadius: {
        edges: { node: { stop: Stop } }[];
      };
    };
  }

  export interface StopTime {
    realtimeArrival: number;
    headsign: string;
    trip: { route: { shortName: string } };
  }
  
  export interface StopTimesResponse {
    data: {
      stop: {
        name: string;
        stoptimesWithoutPatterns: StopTime[];
      };
    };
  }