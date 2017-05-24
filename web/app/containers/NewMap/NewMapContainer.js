import React from 'react';
import { connect } from 'react-redux';
import { Line } from 'rc-progress';

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
        let fields = <div />;
        let percent = (this.state.step / 4) * 100;
        switch (this.state.step) {
            case 0: {
                fields = (
                    <NameTypeFields
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
                        polyCoords={this.state.newMap.boundary.points}
                        handleBoundaries={this.handleBoundaries}
                        position={this.state.newMap.coords}
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                    />
                );
                break;
            }
            case 3: {
                fields = (
                    <PointsOfInterestFields
                        polyCoords={this.state.newMap.boundary.points}
                        position={this.state.newMap.coords}
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
                        polyCoords={this.state.newMap.boundary.points}
                        pointsOfInterest={this.state.newMap.points}
                        position={this.state.newMap.coords}
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
                <div className="gr-progress">
                    Step {this.state.step + 1} of 5
                    <Line
                        percent={percent}
                        strokeColor="#EB3986"
                    />
                </div>
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
