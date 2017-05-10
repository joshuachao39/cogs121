import React from 'react';
import { Map, TileLayer, FeatureGroup, Circle } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';

export default class DrawBoundaryFields extends React.Component {
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

        this.validateAndProceed = this.validateAndProceed.bind(this);
    }

    validateAndProceed() {
        // TODO: validation
        return true;
    }

    _onCreate(e) {
        console.log(e);
    }

    render() {
        const { position } = this.state;

        return (
            <div className="gr-wrapper container-fluid">
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
                        <FeatureGroup>
                            <EditControl
                                position="topright"
                                onEdited={this._onEditPath}
                                onCreated={this._onCreate}
                                onDeleted={this._onDeleted}
                                draw={{
                                    marker: false,
                                }}
                            />
                            <Circle
                                center={[51.51, -0.06]}
                                radius={200}
                            />
                        </FeatureGroup>
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
