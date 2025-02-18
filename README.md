# Public Transport Data Explorer

Wiki created


## Problems that I have faced

Some stations have the same ID, so when doing the map, React reports an error, I had to clean the array I get from the query to solve the problem.
From experience I know that it is not good to use the ID itself or the index, I would like to use crypto.randomUUID(), but as there is no need to remove any element from the list, I don't see it necessary. 

If I were to release this website to production, I would use a GraphQL Client library, to better manage the cache and not make so many requests.