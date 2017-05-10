import React from 'react';
import { Map, TileLayer } from 'react-leaflet';

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
            mapName: 'New Map',
            locationName: 'San Francisco',
            position: {
                lat: 37.772607,
                lon: -122.435886,
            },
        };

        this.changeName = this.changeName.bind(this);
        this.changeLocationName = this.changeLocationName.bind(this);

        this.validateAndProceed = this.validateAndProceed.bind(this);
    }

    changeName(e) {
        this.setState({
            mapName: e.target.value,
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

    validateAndProceed() {
        // TODO: validation
        return true;
    }

    render() {
        const { position } = this.state;

        return (
            <div className="gr-wrapper container-fluid">
                <div className="form-group">
                    <label htmlFor="mapName">Name</label>
                    <input
                      className="gr-map--form-control form-control"
                      type="text"
                      name="mapName"
                      id="mapName"
                      value={this.state.mapName}
                      onChange={this.changeName}
                    />
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
                    <a
                        className="btn btn-default gr-btn--left gr-btn"
                    >
                        Prev
                    </a>
                    <a
                        href=""
                        className="btn btn-default gr-btn--right gr-btn"
                        onClick={this.validateAndProceed}
                    >
                        Next
                    </a>
                </div>
            </div>
        );
    }
}
