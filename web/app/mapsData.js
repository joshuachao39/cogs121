import { MAP_EVENT } from './components/MapTileTypes';

/**
 * Maps data (seeded)
 * // TODO: move this to express server
 */
export const mapsData = [
    {
        id: 0, // Should reflect index of array
        type: MAP_EVENT,
        name: 'SD Hacks',
        description: 'UC San Diegos premier hackathon',
        coords: {
            // Denotes the coordinates to center the map on
            lat: 32.885231,
            lon: -117.239119,
        },
        // Denotes default amount to zoom the map at
        defaultZoom: 0.2,
        boundary: {
            // Boundary is a list of points enclosing the polygon
            // Contains a list of latitudes and longitudes
            points: [
                { lat: 32.885772, lon: -117.238754 },
                { lat: 32.885673, lon: -117.239827 },
                { lat: 32.885456, lon: -117.239741 },
                { lat: 32.885456, lon: -117.240170 },
                { lat: 32.884969, lon: -117.240202 },
                { lat: 32.884924, lon: -117.238722 },
            ],
        },
        points: [
            // Points specify points of interest
            {
                name: 'Help Table',
                boundary: [
                ],
            },
        ],
    },
];
