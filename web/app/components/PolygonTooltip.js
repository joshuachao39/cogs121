import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';

const PolygonTooltip = ({ hide }) => (
    <div
        className={`gr-map--tooltip ${(hide) ? 'hidden' : ''}`}
    >
        <p className="gr-map--tooltip-content">
            <FontAwesome
                className="gr-map--tooltip-icon"
                name="arrow-left"
            /> Start drawing here
        </p>
    </div>
);

PolygonTooltip.propTypes = {
    hide: PropTypes.bool,
};

export default PolygonTooltip;
