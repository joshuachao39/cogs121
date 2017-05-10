const MAP_EVENT = 'MAP_EVENT';
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
            latitude: 32.885231,
            longitude: -117.239119,
        },
        // Denotes default amount to zoom the map at
        defaultZoom: 0.2,
        boundary: {
            // Boundary is a list of points enclosing the polygon
            // Contains a list of latitude and longitude
            points: [
                { latitude: 32.885772, longitude: -117.238754 },
                { latitude: 32.885673, longitude: -117.239827 },
                { latitude: 32.885456, longitude: -117.239741 },
                { latitude: 32.885456, longitude: -117.240170 },
                { latitude: 32.884969, longitude: -117.240202 },
                { latitude: 32.884924, longitude: -117.238722 },
            ],
        },
        points: [
            // Points specify points of interest
            {
                name: 'Help Table',
                boundary: {
                    points: [
                        { latitude: 32.885346, longitude: -117.239229 },
                        { latitude: 32.885253, longitude: -117.239248 },
                        { latitude: 32.885221, longitude: -117.239074 },
                        { latitude: 32.885351, longitude: -117.239099 },
                    ],
                },
            },
            {
                name: 'Main Event',
                boundary: {
                    points: [
                        { latitude: 32.885415, longitude: -117.240061 },
                        { latitude: 32.885007, longitude: -117.240058 },
                        { latitude: 32.885000, longitude: -117.239660 },
                        { latitude: 32.885157, longitude: -117.239666 },
                        { latitude: 32.885159, longitude: -117.239832 },
                        { latitude: 32.885427, longitude: -117.239844 },
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
            latitude: 34.068921,
            longitude: -118.4473698,
        },
        // Denotes default amount to zoom the map at
        defaultZoom: 0.3,
        boundary: {
            // Boundary is a list of points enclosing the polygon
            // Contains a list of latitudeitudes and longitudegitudes
            points: [
                { latitude: 34.070029, longitude: -118.4482479 },
                { latitude: 34.070047, longitude: -118.4473143 },
                { latitude: 34.070762, longitude: -118.4473193 },
                { latitude: 34.070758, longitude: -118.4485153 },
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
    {
        id: 2, // Should reflect index of array
        type: MAP_EVENT,
        name: 'Cogs 121',
        description: 'UC San Diegos best class',
        coords: {
            // Denotes the coordinates to center the map on
            latitude: 32.878461,
            longitude: -117.241389,
        },
        // Denotes default amount to zoom the map at
        defaultZoom: 0.2,
        boundary: {
            // Boundary is a list of points enclosing the polygon
            // Contains a list of latitude and longitude
            points: [
                { latitude: 32.878654, longitude: -117.241582 },
                { latitude: 32.878598, longitude: -117.241327 },
                { latitude: 32.878393, longitude: -117.241319 },
                { latitude: 32.878395, longitude: -117.241453 },
                { latitude: 32.878483, longitude: -117.241456 },
                { latitude: 32.878494, longitude: -117.241574 },
            ],
        },
        points: [
            // Points specify points of interest
            {
                name: 'Classroom',
                boundary: {
                    points: [
                        { latitude: 32.878483, longitude: -117.241453 },
                        { latitude: 32.878488, longitude: -117.241323 },
                        { latitude: 32.878396, longitude: -117.241315 },
                        { latitude: 32.878398, longitude: -117.241450 },
                    ],
                },
            },
            {
                name: 'Study Space',
                boundary: {
                    points: [
                        { latitude: 32.878398, longitude: -117.241450 },
                        { latitude: 32.878605, longitude: -117.241459 },
                        { latitude: 32.878491, longitude: -117.241458 },
                        { latitude: 32.878489, longitude: -117.241573 },
                    ],
                },
            },
        ],
    },
];
