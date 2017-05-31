import React from 'react';
import PropTypes from 'prop-types';
import { Map, TileLayer, FeatureGroup, Polygon } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import { Line } from 'rc-progress';
import FontAwesome from 'react-fontawesome';

const propTypes = {
    step: PropTypes.number,
    nextStep: PropTypes.func,
    prevStep: PropTypes.func,
    handleBoundaries: PropTypes.func,
    position: PropTypes.object,
    polyCoords: PropTypes.array,
};

export default class DrawBoundaryFields extends React.Component {
    constructor(props) {
        super(props);

        // TODO: only allow one boundary to be drawn

        this.state = {
            // Keeps track of if the boundary of the event has been created
            boundaryCreated: (this.props.polyCoords) ? true : false, // eslint-disable-line
            polygonDrawn: false,
            boundaryError: '',
        };

        this.validate = this.validate.bind(this);
        this.validateAndNext = this.validateAndNext.bind(this);
        this.validateAndPrevious = this.validateAndPrevious.bind(this);
        this._onCreate = this._onCreate.bind(this);
        this._onMount = this._onMount.bind(this);
    }

    _onMount() {
        // Evil hack
        const _this = this;

        document.getElementsByClassName('leaflet-draw-draw-polygon')[0].addEventListener('click', function() {
            _this.setState({ polygonDrawn: true });
        });
    }

    validate() {
        return this.state.boundaryCreated;
    }

    validateAndPrevious() {
        this.props.prevStep();
    }

    validateAndNext() {
        if (this.validate()) {
            this.props.nextStep();
        } else {
            // TODO: Log an error here
            this.setState({
                boundaryError: 'Please create a boundary.'
            });
            console.log('Boundary not created');
        }
    }

    /**
     * Handler to handle the creation of polygons
     */
    _onCreate(e) {
        // Prep datatype
        this.props.handleBoundaries(e.layer._latlngs[0]);
        this.setState({
            boundaryCreated: true,
        });
    }

    render() {
        const { position, step } = this.props;
        const percent = (step / 4) * 100;

        return (
            <div className="gr-wrapper gr-newmap--wrapper">
                <div className="gr-sidebar--wrapper">
                    <div className="gr-sidebar">
                        <div className="gr-sidebar--top">
                            <h1>Guorient</h1>
                            <div className="gr-progress">
                                Step {step + 1} of 5
                                <Line
                                    style={{
                                        height: '12px',
                                        width: '100%',
                                        borderRadius: '6px',
                                    }}
                                    percent={percent}
                                    strokeColor="#EB3986"
                                />
                            </div>
                        </div>
                        <div className="vcenter form-group">
                            <h4 className="gr-sidebar--instruction">
                                Draw boundary of your venue
                            </h4>
                            {!this.state.boundaryCreated &&
                                <p className="error"> {this.state.boundaryError} </p>
                            }
                        </div>
                        <div className="gr-step--selector gr-sidebar--bottom">
                            <button
                                className="btn btn-default gr-btn--left gr-btn"
                                onClick={this.validateAndPrevious}
                            >
                                Prev
                            </button>
                            <button
                                className="btn btn-default gr-btn--right gr-btn gr-btn--primary"
                                onClick={this.validateAndNext}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
                <div
                    className={`gr-map--tooltip ${(this.state.polygonDrawn || this.state.boundaryCreated) ? 'hidden' : ''}`}
                >
                    <p className="gr-map--tooltip-content">
                        <FontAwesome name="arrow-left"/> Start drawing here
                    </p>
                </div>
                <div className="gr-map--wrapper">
                    <Map
                        center={position}
                        zoom={18}
                        scrollWheelZoom={false}
                        style={{
                            height: '100vh',
                        }}
                    >
                        <TileLayer
                            url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
                            attribution="&copy; <a href='http://osm.org/copyright'>OpenStreetMap</a> contributors"
                        />
                        {this.props.polyCoords &&
                            <Polygon
                                positions={this.props.polyCoords}
                            />
                        }
                        <FeatureGroup>
                            <EditControl
                                position="topleft"
                                onEdited={this._onEditPath}
                                onMounted={this._onMount}
                                onCreated={this._onCreate}
                                onDeleted={this._onDeleted}
                                draw={{
                                    marker: false,
                                    circle: false,
                                    rectangle: false,
                                    polyline: false,
                                }}
                            />
                        </FeatureGroup>
                    </Map>
                </div>
            </div>
        );
    }
}

DrawBoundaryFields.propTypes = propTypes;
