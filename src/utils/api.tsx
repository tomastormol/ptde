const API_KEY = "b9ea57820cf74c649049213909ec8d96";
import { StopTimesResponse } from './types';

export async function fetchTransportData<T>(query: string): Promise<T> {
    const response = await fetch('https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'digitransit-subscription-key': API_KEY,
        },
        body: JSON.stringify({ query }),
    });

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.json() as Promise<T>;
}

export async function fetchStopTimes(stopId: string): Promise<StopTimesResponse> {
    const query = `
    {
      stop(id: "${stopId}") {
        name
        stoptimesWithoutPatterns {
          realtimeArrival
          headsign
          trip {
            route { shortName }
          }
        }
      }
    }`;
    return fetchTransportData<StopTimesResponse>(query);
  }
