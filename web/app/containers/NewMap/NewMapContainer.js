import React from 'react';
import { connect } from 'react-redux';

import * as actions from '../../actions';

import LocationFields from './LocationFields';
import DrawBoundaryFields from './DrawBoundaryFields';
import PointsOfInterestFields from './PointsOfInterestFields';
import FinalizeFields from './FinalizeFields';


// Seed some locations for the demo
const seededLocations = { // eslint-disable-line
    'San Francisco': {
        lat: 37.772607,
        lng: -122.435886,
    },
};

const endState = 4;

class NewMapContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            step: 1,
            newMap: {},
        };

        this.handleInit = this.handleInit.bind(this);
        this.handleBoundaries = this.handleBoundaries.bind(this);
        this.handlePoints = this.handlePoints.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.nextStep = this.nextStep.bind(this);
        this.prevStep = this.prevStep.bind(this);
    }

    /**
     * Handles initialization (name, description, coords) of the map)
     */
    handleInit(type, name, description, coords) {
        this.setState({
            newMap: {
                ...this.state.newMap,
                type,
                name,
                description,
                coords,
                defaultZoom: 0.2,
                boundary: {},
                points: [],
            }
        });
        console.log(this.state.newMap);
    }

    /**
     * Handles DrawBoundaryFields step
     * @param latlngs - a list of objects like { lat: ..., lng: ... }
     */
    handleBoundaries(latlngs) {
        this.setState({
            newMap: {
                ...this.state.newMap,
                boundary: {
                    ...this.state.newMap.boundary,
                    points: latlngs,
                },
            },
        });
        console.log(this.state.newMap);
    }

    /**
     * Handles drawing of points
     */
    handlePoints(latlngs) {
        this.setState({
            newMap: {
                ...this.state.newMap,
                points: [
                    ...this.state.newMap.points,
                    {
                        name: 'New point',
                        boundary: {
                            points: latlngs,
                        },
                    },
                ],
            },
        });
        console.log(this.state.newMap);
    }

    /**
     * Handles submission of the form. Should call the reducer
     */
    handleSubmit() {
        console.log(this.state.newMap);
        console.log('Submitting');
        this.props.dispatch(actions.addMap(this.state.newMap)); // eslint-disable-line
    }

    nextStep() {
        console.log('Moving to next step');
        if (this.state.step === endState) {
            // Finalize (send the post request here)
        } else {
            this.setState({
                step: this.state.step + 1,
            });
        }
    }

    prevStep() {
        console.log('Moving to previous step');
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
                        handleInit={this.handleInit}
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                    />
                );
            }
            case 2: {
                return (
                    <DrawBoundaryFields
                        handleBoundaries={this.handleBoundaries}
                        position={this.state.newMap.coords}
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                    />
                );
            }
            case 3: {
                return (
                    <PointsOfInterestFields
                        polyCoords={this.state.newMap.boundary.points}
                        position={this.state.newMap.coords}
                        handlePoints={this.handlePoints}
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                    />
                );
            }
            case 4: {
                return (
                    <FinalizeFields
                        polyCoords={this.state.newMap.boundary.points}
                        pointsOfInterest={this.state.newMap.points}
                        position={this.state.newMap.coords}
                        handleSubmit={this.handleSubmit}
                        prevStep={this.prevStep}
                    />
                );
            }
            default:
                return <div />;
        }
    }
}

function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps, actions)(NewMapContainer);
