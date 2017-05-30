import React from 'react';
import { connect } from 'react-redux';

import * as actions from '../../actions';

import NameTypeFields from './NameTypeFields';
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
            step: 0,
            newMap: {
                defaultZoom: 0.2,
                boundary: {},
                points: [],
            },
            init: false,
        };

        this.handleInit = this.handleInit.bind(this);
        this.handleLocation = this.handleLocation.bind(this);
        this.handleBoundaries = this.handleBoundaries.bind(this);
        this.handlePoints = this.handlePoints.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.nextStep = this.nextStep.bind(this);
        this.prevStep = this.prevStep.bind(this);
    }

    /**
     * Handles init (name, description, type) of the map
     * and initializes other fields to default values
     */
    handleInit(name, description, type) { // eslint-disable-line
        this.setState({
            newMap: {
                ...this.state.newMap,
                name,
                description,
                type: 'MAP_EVENT',
            },
        });
        console.log(this.state.newMap);
    }

    /**
     * Handles location finding (coords) of the map
     */
    handleLocation(locationName, coords) {
        this.setState({
            newMap: {
                ...this.state.newMap,
                locationName,
                coords,
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
    handlePoints(pointsOfInterest) {
        this.setState({
            newMap: {
                ...this.state.newMap,
                points: [
                    // ...this.state.newMap.points,
                    ...pointsOfInterest,
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
        this.props.dispatch(actions.addMap(this.state.newMap)); // eslint-disable-line
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
        if (this.state.step === 0) {
            // Return to previous page
        } else {
            this.setState({
                step: this.state.step - 1,
            });
        }
    }

    render() {
        const { newMap, step } = this.state;
        let fields = <div />;
        switch (this.state.step) {
            case 0: {
                fields = (
                    <NameTypeFields
                        step={step}
                        handleInit={this.handleInit}
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                    />
                );
                break;
            }
            case 1: {
                fields = (
                    <LocationFields
                        step={step}
                        handleLocation={this.handleLocation}
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                    />
                );
                break;
            }
            case 2: {
                fields = (
                    <DrawBoundaryFields
                        step={step}
                        polyCoords={newMap.boundary.points}
                        handleBoundaries={this.handleBoundaries}
                        position={newMap.coords}
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                    />
                );
                break;
            }
            case 3: {
                fields = (
                    <PointsOfInterestFields
                        step={step}
                        pointsOfInterest={newMap.points}
                        polyCoords={newMap.boundary.points}
                        position={newMap.coords}
                        handlePoints={this.handlePoints}
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                    />
                );
                break;
            }
            case 4: {
                fields = (
                    <FinalizeFields
                        step={step}
                        polyCoords={newMap.boundary.points}
                        pointsOfInterest={newMap.points}
                        position={newMap.coords}
                        handleSubmit={this.handleSubmit}
                        prevStep={this.prevStep}
                    />
                );
                break;
            }
            default:
                fields = <div />;
                break;
        }

        return (
            <div>
                {fields}
            </div>
        );
    }
}

// function mapDispatchToProps(dispatch) {
//   let actions = bindActionCreators({ getApplications });
//   return { ...actions, dispatch };
// }

export default connect()(NewMapContainer);
