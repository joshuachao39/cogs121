import React, { PropTypes } from 'react';

import MapTile from './MapTile';
import { MAP_NEW } from './MapTileTypes';
import { mapsData } from '../mapsData';

const MapList = ({ filter }) => {
    let rows = [];

    mapsData.forEach((elem) => {
        const nameLC = elem.name.toLowerCase();
        const filterLC = filter.toLowerCase();

        if (nameLC.indexOf(filterLC) !== -1) {
            rows.push(
                <MapTile key={elem.name} data={elem} />
            );
        }
    });

    rows.push(
      <MapTile key={'new'} data={{ type: MAP_NEW }} />
    );

    return (
        <div className="row">
            {rows}
        </div>
    );
};

MapList.propTypes = {
    filter: PropTypes.string
};

export default MapList;
