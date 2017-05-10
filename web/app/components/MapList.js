import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as actions from '../actions';

import MapTile from './MapTile';
import { MAP_NEW } from './MapTileTypes';


const propTypes = {
    filter: PropTypes.string,
    maps: PropTypes.array,
};

class MapList extends React.Component {
    render() {
        let rows = [];

        const { maps, filter } = this.props;

        maps.forEach((elem) => {
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
    }
}

MapList.propTypes = propTypes;

function mapStateToProps(state) {
    return {
        maps: state.maps,
    };
}

export default connect(mapStateToProps, actions)(MapList);
