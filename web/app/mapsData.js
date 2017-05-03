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
                boundary: {
                    points: [
                        { lat: 32.885346, lon: -117.239229 },
                        { lat: 32.885253, lon: -117.239248 },
                        { lat: 32.885221, lon: -117.239074 },
                        { lat: 32.885351, lon: -117.239099 },
                    ],
                },
            },
            {
                name: 'Main Event',
                boundary: {
                    points: [
                        { lat: 32.885415, lon: -117.240061 },
                        { lat: 32.885007, lon: -117.240058 },
                        { lat: 32.885000, lon: -117.239660 },
                        { lat: 32.885157, lon: -117.239666 },
                        { lat: 32.885159, lon: -117.239832 },
                        { lat: 32.885427, lon: -117.239844 },
                    ],
                },
            },
        ],
    },
    {
        id: 1, // Should reflect index of array
        type: MAP_EVENT,
        name: 'LA Hacks',
        description: 'was once a somewhat hype hackathon, but is now shadowed by the more popular SD Hacks',
        coords: {
            // Denotes the coordinates to center the map on
            lat: 34.068921,
            lon: -118.4473698,
        },
        // Denotes default amount to zoom the map at
        defaultZoom: 0.3,
        boundary: {
            // Boundary is a list of points enclosing the polygon
            // Contains a list of latitudes and longitudes
            points: [
                { lat: 34.070029, lon: -118.4482479 },
                { lat: 34.070047, lon: -118.4473143 },
                { lat: 34.070762, lon: -118.4473193 },
                { lat: 34.070758, lon: -118.4485153 },
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
