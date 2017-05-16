import React from 'react';
import PropTypes from 'prop-types';
import { Map, TileLayer } from 'react-leaflet';
import GoogleMapLoader from 'react-google-maps-loader';
import GooglePlacesSuggest from 'react-google-places-suggest';
import 'react-google-places-suggest/lib/index.css';

// Seed some locations for the demo
const seededLocations = { // eslint-disable-line
    'San Francisco': {
        lat: 37.772607,
        lng: -122.435886,
    },
};

// TODO: add redux state updating to this
class LocationFields extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            locationName: 'San Francisco',
            position: {
                lat: 37.772607,
                lng: -122.435886,
            },
            search: '',
            selectedCoordinate: null,
        };

        this.changeLocationName = this.changeLocationName.bind(this);
        this.handleDrag = this.handleDrag.bind(this);

        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.handleSelectSuggest = this.handleSelectSuggest.bind(this);
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

    handleSearchChange(e) {
        this.setState({search: e.target.value});
    }

    handleSelectSuggest(suggest, coordinate) {
        this.setState({search: suggest.description, selectedCoordinate: coordinate});
    }

    validateAndPrevious() {
        if (this.validate()) {
            this.props.handleLocation(this.state.locationName, this.state.position);
            this.props.prevStep();
        }
    }

    validateAndNext() {
        if (this.validate()) {
            this.props.handleLocation(this.state.locationName, this.state.position);
            this.props.nextStep();
        }
    }

    render() {
        const { position, search } = this.state;
        const { googleMaps } = this.props;

        return (
            <div className="gr-wrapper">
                <div className="form-group">
                    <GooglePlacesSuggest
                        googleMaps={googleMaps}
                        onSelectSuggest={this.handleSelectSuggest}
                        search={search}
                    >
                        <input
                            className="form-control"
                            type="text"
                            value={search}
                            placeholder="Search a location"
                            onChange={this.handleSearchChange}
                        />
                    </GooglePlacesSuggest>
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
    handleLocation: PropTypes.func,
    googleMaps: PropTypes.object,
};

export default GoogleMapLoader(LocationFields, {
    libraries: ['places'],
    key: 'AIzaSyAA5q_szpvD8hf-pAtAN52J7goZ81Q-d2c',
});
