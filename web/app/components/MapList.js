import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as actions from '../actions';

import MapTile from './MapTile';
import { MAP_NEW } from './MapTileTypes';
// import { mapList } from '../styles/mapList.scss';

const propTypes = {
    filter: PropTypes.string,
    maps: PropTypes.object,
};

class MapList extends React.Component {
    render() {
        let rows = [];
        let newrow = [];

        const { maps, filter } = this.props;

        newrow.push(
          <MapTile key={'new'} data={{ type: MAP_NEW }} />
        );

        if (!maps.data) {
            return (
                <div>
                    No maps to show
                </div>
            );
        }

        maps.forEach((elem) => {
            const nameLC = elem.name.toLowerCase();
            const filterLC = filter.toLowerCase();

            if (nameLC.indexOf(filterLC) !== -1) {
                rows.push(
                    <MapTile key={elem.name} data={elem} />
                );
            }
        });

        return (
            <div>
                <div id="newrow">
                    {newrow}
                </div>
                <div id="row">
                    {rows}
                </div>
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
