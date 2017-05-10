import React from 'react';

import LocationFields from './LocationFields';
import DrawBoundaryFields from './DrawBoundaryFields';
import PointsOfInterestFields from './PointsOfInterestFields';
import FinalizeFields from './FinalizeFields';

// Seed some locations for the demo
const seededLocations = { // eslint-disable-line
    'San Francisco': {
        lat: 37.772607,
        lon: -122.435886,
    },
};

export default class NewMapContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            step: 2,
        };
    }

    render() {
        switch (this.state.step) {
            case 1:
                return <LocationFields />;
            case 2:
                return <DrawBoundaryFields />;
            case 3:
                return <PointsOfInterestFields />;
            case 4:
                return <FinalizeFields />;
            default:
                return <div />;
        }
    }
}
