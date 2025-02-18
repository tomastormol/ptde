export interface Stop {
    gtfsId: string;
    name: string;
    lat: number;
    lon: number;
  }
  
  export interface StopEdge {
    node: {
      stop: Stop;
    };
  }
  
  export interface StopsByRadiusResponse {
    data: {
      stopsByRadius: {
        edges: StopEdge[];
      };
    };
  }