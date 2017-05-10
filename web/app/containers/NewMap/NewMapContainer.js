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

const endState = 4;

export default class NewMapContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            step: 2,
        };
    }

    nextStep() {
        if (this.state.step === endState) {
            // Finalize (send the post request here)
        } else {
            this.setState({
                step: this.state.step + 1,
            });
        }
    }

    prevStep() {
        if (this.state.step === 1) {
            // Return to previous page
        } else {
            this.setState({
                step: this.state.step - 1,
            });
        }
    }

    render() {
        switch (this.state.step) {
            case 1: {
                return (
                    <LocationFields
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                    />
                );
            }
            case 2: {
                return (
                    <DrawBoundaryFields
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                    />
                );
            }
            case 3: {
                return (
                    <PointsOfInterestFields
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                    />
                );
            }
            case 4: {
                return (
                    <FinalizeFields
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                    />
                );
            }
            default:
                return <div />;
        }
    }
}
