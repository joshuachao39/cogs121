import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Map, TileLayer } from 'react-leaflet';

import { MAP_EVENT } from './MapTileTypes';

const MapTile = ({ data, mapless }) => {
    const id = (data.type === MAP_EVENT) ? data.id : 'New';
    const name = (data.type === MAP_EVENT) ? data.name : 'New';
    const description = (data.type === MAP_EVENT) ? data.description : 'Create a new map';

    const divStyle = {
        marginTop: 20
    };

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
            </Map>
        </div>
    );

    return (
        <Link to={`/maps/${id}`}>
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
