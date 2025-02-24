# Public Transport Data Explorer

A web application to explore public transport data using the HSL API. It allows users to search for stations, visualize them on a map, and get transport information in real-time. Additionally, users can filter results using four buttons for bus, tram, rail, and subway.

## Challenges and Solutions

### Duplicate Station IDs

Some stations have the same ID, which caused React to report an error when rendering the map. To fix this, I cleaned the array received from the query before rendering.

### Unique Keys in React

Using the station ID or array index as a key in React can lead to issues. While crypto.randomUUID() would be a better approach, I found it unnecessary since no elements are removed dynamically from the list.

### Search Input Performance

Initially, every keystroke in the search input caused the entire map to re-render. To optimize this, I used useRef to prevent unnecessary updates and improve performance.

## Potential Improvements

- **GraphQL Client:** If this were a production application, I would integrate a GraphQL client library (like Apollo or URQL) to better manage caching and reduce API requests.
- **Better UI/UX:** The UI could be improved by adding loading indicators, animations, and a more intuitive design.
- **Error Handling:** Right now, API errors are handled minimally. A more robust error handling system could improve user experience.
- **Performance Optimizations:** Using memoization techniques (useMemo, useCallback) in specific parts of the application could further enhance performance.
- **Dockerization:** Containerizing the application would allow easier deployment on different platforms and ensure consistent development environments.