export const STOPS_BY_RADIUS_QUERY = `
  {
    stopsByRadius(lat: $lat, lon: $lon, radius: $radius) { # Usa placeholders
      edges {
        node {
          stop {
            gtfsId
            name
            lat
            lon
            vehicleMode
          }
        }
      }
    }
  }
`;

export const STOP_TIMES_QUERY = `
  {
    stop(id: "$stopId") {
      name
      stoptimesWithoutPatterns {
        realtimeArrival
        headsign
        trip {
          route { shortName }
        }
      }
    }
  }
`;