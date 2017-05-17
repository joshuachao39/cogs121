import React from 'react';
import PropTypes from 'prop-types';
import { Map, TileLayer, Polygon } from 'react-leaflet';

export default class FinalizeFields extends React.Component {
    constructor(props) {
        super(props);

        this.validate = this.validate.bind(this);
        this.validateAndSubmit = this.validateAndSubmit.bind(this);
        this.validateAndPrevious = this.validateAndPrevious.bind(this);
        this.renderPolygons = this.renderPolygons.bind(this);
    }

    validate() {
        return true;
    }

    validateAndSubmit() {
        if (this.validate()) this.props.handleSubmit();
    }

    validateAndPrevious() {
        this.props.prevStep();
    }

    renderPolygons() {
        return this.props.pointsOfInterest.map((point) => {
            const position = point.boundary.points;
            return <Polygon positions={position} />;
        });
    }

    render() {
        const { position } = this.props;

        const pointsOfInterest = this.renderPolygons();

        return (
            <div className="gr-wrapper">
                <h4>Finalize</h4>
                <div className="gr-map--wrapper">
                    <Map
                        center={position}
                        zoom={18}
                        scrollWheelZoom={false}
                        style={{
                            height: '80vh',
                        }}
                    >
                        <TileLayer
                            url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
                            attribution="&copy; <a href='http://osm.org/copyright'>OpenStreetMap</a> contributors"
                        />
                        <Polygon
                            positions={this.props.polyCoords}
                        />
                        {pointsOfInterest}
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
                        className="btn btn-primary gr-btn--right gr-btn"
                        onClick={this.validateAndSubmit}
                    >
                        Submit
                    </button>
                </div>
            </div>
        );
    }
}

FinalizeFields.propTypes = {
    nextStep: PropTypes.func,
    prevStep: PropTypes.func,
    handleSubmit: PropTypes.func,
    polyCoords: PropTypes.array,
    pointsOfInterest: PropTypes.array,
    position: PropTypes.object,
};
