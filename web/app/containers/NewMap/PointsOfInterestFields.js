import React from 'react';
import PropTypes from 'prop-types';
import { Map, TileLayer, FeatureGroup, Polygon } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import { Line } from 'rc-progress';

import FontAwesome from 'react-fontawesome';

import PointOfInterest from './PointOfInterest';

const propTypes = {
    step: PropTypes.number,
    nextStep: PropTypes.func,
    prevStep: PropTypes.func,
    handlePoints: PropTypes.func,
    pointsOfInterest: PropTypes.array,
    position: PropTypes.object,
    polyCoords: PropTypes.array,
};

export default class PointsOfInterestFields extends React.Component {
    constructor(props) {
        super(props);

        this.validate = this.validate.bind(this);
        this.validateAndNext = this.validateAndNext.bind(this);
        this.validateAndPrevious = this.validateAndPrevious.bind(this);
        this.renderPolygons = this.renderPolygons.bind(this);
        this.renderSidebarList = this.renderSidebarList.bind(this);
        this.handlePointChange = this.handlePointChange.bind(this);

        this._onCreate = this._onCreate.bind(this);
        this._onMount = this._onMount.bind(this);

        this.state = {
            pointsOfInterest: [
                ...this.props.pointsOfInterest,
            ],
            polygonDrawn: false,
        };
    }

    _onMount() {
        // Evil hack
        const _this = this;

        document.getElementsByClassName('leaflet-draw-draw-polygon')[0].addEventListener('click', function() {
            _this.setState({ polygonDrawn: true });
        });
    }

    validate() {
        return true;
    }

    validateAndPrevious() {
        this.props.prevStep();
    }

    validateAndNext() {
        if (this.validate()) {
            this.props.handlePoints(this.state.pointsOfInterest);
            this.props.nextStep();
        } else {
            console.log('Boundary not created');
        }
    }

    handlePointChange(index, name, color) {
        // Update but keep order
        this.setState({
            pointsOfInterest: this.state.pointsOfInterest.map((point, i) => {
                if (i === index) {
                    return {
                        ...point,
                        name,
                        color,
                    };
                }
                return point;
            }),
        });
    }

    renderPolygons() {
        return (this.state.pointsOfInterest) ? this.state.pointsOfInterest.map((point) => {
            const position = point.boundary.points;

            return (
                <Polygon
                    positions={position}
                    color={point.color}
                    fillColor={point.color}
                />
            );
        }) : null;
    }

    renderSidebarList() {
        return (this.state.pointsOfInterest) ? this.state.pointsOfInterest.map((point, i) => {
            // const position = point.boundary.points;
            return (
                <PointOfInterest
                    index={i}
                    name={point.name}
                    color={point.color}
                    handlePointChange={this.handlePointChange}
                />
            );
        }) : null;
    }

    /**
     * Handler to handle the creation of polygons
     */
    _onCreate(e) {
        // Prep datatype
        // this.props.handlePoints(e.layer._latlngs[0]);
        const newIndex = this.state.pointsOfInterest.length + 1;
        this.setState({ polygonDrawn: true });

        this.setState({
            pointsOfInterest: [
                ...this.state.pointsOfInterest,
                {
                    name: `Point ${newIndex}`,
                    color: '#39A4EB',
                    boundary: {
                        points: e.layer._latlngs[0],
                    },
                },
            ],
        });
    }

    render() {
        const { position, step } = this.props;
        const percent = (step / 4) * 100;

        const pointsOfInterest = this.renderPolygons();
        const pointsOfInterestSidebarList = this.renderSidebarList();

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
                                Label places of interest
                            </h4>
                            {pointsOfInterestSidebarList}
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
                    className={`gr-map--tooltip ${(this.state.polygonDrawn && this.props.pointsOfInterest.length === 0) ? 'hidden' : ''}`}
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
                        <Polygon
                            color="#888888"
                            positions={this.props.polyCoords}
                        />
                        {pointsOfInterest}
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
                <div className="gr-step--selector">
                    <button
                        className="btn btn-default gr-btn--left gr-btn"
                        onClick={this.validateAndPrevious}
                    >
                        Prev
                    </button>
                    <button
                        className="btn btn-default gr-btn--right gr-btn"
                        onClick={this.validateAndNext}
                    >
                        Next
                    </button>
                </div>
            </div>
        );
    }
}

PointsOfInterestFields.propTypes = propTypes;
