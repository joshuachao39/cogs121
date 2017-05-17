import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import { MAP_EVENT } from './MapTileTypes';
import { mapTile } from '../styles/mapTile.scss';

const MapTile = ({ data }) => {
    const id = (data.type === MAP_EVENT) ? data.id : 'New';
    const name = (data.type === MAP_EVENT) ? data.name : 'New';
    const description = (data.type === MAP_EVENT) ? data.description : 'Create a new map';

    const divStyle = {
        marginTop: 20
    };

    return (
        <div className={mapTile}>
            <Link to={`/maps/${id}`}>
                <div className="gr-card card" style={divStyle}>
                    <img
                        className="card-img-top"
                        src="http://lorempixel.com/g/400/200"
                        alt="map"
                    />
                    <div className="card-block">
                        <h4 className="card-title">{name}</h4>
                        <p>{description}</p>
                    </div>
                </div>
            </Link>
        </div>
    );
};

MapTile.propTypes = {
    data: PropTypes.object
};

export default MapTile;
