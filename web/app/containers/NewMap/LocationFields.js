import React from 'react';
import PropTypes from 'prop-types';
import { Map, TileLayer } from 'react-leaflet';
import { MAP_EVENT } from '../../components/MapTileTypes';

// Seed some locations for the demo
const seededLocations = { // eslint-disable-line
    'San Francisco': {
        lat: 37.772607,
        lng: -122.435886,
    },
};

// TODO: add redux state updating to this
export default class LocationFields extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            locationName: 'San Francisco',
            position: {
                lat: 37.772607,
                lng: -122.435886,
            },
        };

        this.changeLocationName = this.changeLocationName.bind(this);
        this.handleDrag = this.handleDrag.bind(this);

        this.validateAndPrevious = this.validateAndPrevious.bind(this);
        this.validateAndNext = this.validateAndNext.bind(this);
        this.validate = this.validate.bind(this);
    }

    handleDrag(e) {
        this.setState({
            position: e.target.options.center,
        });
    }

    changeLocationName(e) {
        this.setState({
            locationName: e.target.value,
        });

        // TODO: on selection of a location from dropdown, center
        // map on this location and update this.state.position

        // TODO: or use coordinates to search
    }

    validate() {
        return true;
    }

    validateAndPrevious() {
        if (this.validate()) {
            this.props.handleInit(MAP_EVENT, this.state.mapName, this.state.locationName, this.state.position);
            this.props.prevStep();
        }
    }

    validateAndNext() {
        if (this.validate()) {
            this.props.handleInit(MAP_EVENT, this.state.mapName, this.state.locationName, this.state.position);
            this.props.nextStep();
        }
    }

    render() {
        const { position } = this.state;

        return (
            <div className="gr-wrapper container-fluid">
                <div className="form-group">
                    <label htmlFor="locationName">Location</label>
                    <input
                      className="gr-map--form-control form-control"
                      type="text"
                      name="mapLocation"
                      id="mapLocation"
                      value={this.state.locationName}
                      onChange={this.changeLocationName}
                    />
                </div>
                <div className="gr-map--wrapper">
                    <Map
                        onDragEnd={this.handleDrag}
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

LocationFields.propTypes = {
    nextStep: PropTypes.func,
    prevStep: PropTypes.func,
    handleInit: PropTypes.func,
};
