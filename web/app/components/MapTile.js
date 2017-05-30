import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Map, TileLayer, Polygon } from 'react-leaflet';

import { MAP_EVENT } from './MapTileTypes';

const MapTile = ({ data, mapless }) => {
    let id = 'New';
    let name = 'Name';
    let description = 'Create a new map';

    let polygons = null;

    const divStyle = {
        marginTop: 20
    };

    if (data.type === MAP_EVENT) {
        id = data.id;
        name = data.name;
        description = data.description;

        polygons = data.points.map((point) => {
            const position = point.boundary.points;
            return <Polygon positions={position} />;
        });
    }

    const map = (mapless) ? null : (
        <div
            className="gr-card--map"
            key={data.name}
        >
            <Map
                center={data.coords}
                zoom={16}
                scrollWheelZoom={false}
                style={{
                    height: '180px',
                }}
            >
                <TileLayer
                    url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
                    attribution="&copy; <a href='http://osm.org/copyright'>OpenStreetMap</a> contributors"
                />
                <Polygon
                    positions={data.boundary.points}
                />
                {polygons}
            </Map>
        </div>
    );

    return (
        <Link
            className="gr-card--link"
            to={`/maps/${id}`}
        >
            <div className="gr-card card" style={divStyle}>
                {map}
                <div className="card-block">
                    <h4 className="card-title">{name}</h4>
                    <p>{description}</p>
                </div>
            </div>
        </Link>
    );
};

MapTile.propTypes = {
    data: PropTypes.object,
    mapless: PropTypes.bool,
};

export default MapTile;
