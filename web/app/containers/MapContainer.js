import React, { PropTypes } from 'react';
import { Map, Popup, TileLayer, Polygon } from 'react-leaflet';
import { mapsData } from '../mapsData';

export default class MapContainer extends React.Component {
    constructor(props) {
        super(props);

        this.mapId = parseInt(this.props.params.mapId, 10);
        this.map = mapsData[this.mapId];

        // TODO: this.map is undefined -> 404 error
    }

    render() {
        const position = [
            this.map.coords.lat,
            this.map.coords.lon,
        ];

        const positions = [];
        this.map.boundary.points.forEach((elem) => {
            positions.push([ elem.lat, elem.lon ]);
        });

        const pointsData = this.map.points;

        const pointsMap = pointsData.map((point) => {
            let pointPositions = [];
            point.boundary.points.forEach((elem) => {
                pointPositions.push([ elem.lat, elem.lon ]);
            });
            return (
                <Polygon
                    positions={pointPositions}
                    color="red"
                    key={point.name}
                >
                    <Popup>
                        <span>{point.name}</span>
                    </Popup>
                </Polygon>
            );
        });

        return (
            <div className="gr-map--wrapper container-fluid">
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
                    <Polygon positions={positions}>
                        <Popup>
                            <span>{this.map.name}<br />{this.map.description}</span>
                        </Popup>
                        {pointsMap}
                    </Polygon>
                </Map>
            </div>
        );
    }
}

MapContainer.propTypes = {
    // data: PropTypes.object,
    mapName: PropTypes.string,
    params: PropTypes.object,
};
