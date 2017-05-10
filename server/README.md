## The backend for the application

### Port
This server should run on http://localhost:8000

### Routes

The routes for this server involve

GET `maps`: Returns a list with all the maps

GET `maps/:mapID`: Returns a JSON object with the associated map. mapID should be the index associated with the map

POST `maps/new`: Appends a new map to the list of maps
