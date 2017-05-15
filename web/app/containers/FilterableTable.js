import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { filterTable } from '../actions';
import MapList from '../components/MapList';

const FilterableTable = ({ filter, onFilter }) => {
    let input;

    return (
        <div>
            <input
                value={filter}
                ref={node => {input = node;}}
                onChange={() => onFilter(input.value)}
            />
            <MapList filter={filter} />
        </div>
    );
};

FilterableTable.propTypes = {
    filter: PropTypes.string,
    onFilter: PropTypes.func
};

const mapStateToProps = (state) => {
    return {
        filter: state.filter
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onFilter: filterText => dispatch(filterTable(filterText))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FilterableTable);
