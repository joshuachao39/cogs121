import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    color: PropTypes.string,
};

const Navigation = ({ color }) => {
    const navColorClass = (color) ? `gr-navbar--${color}` : 'gr-navbar--dark';

    return (
        <nav className={`navbar navbar-fixed navbar-toggleable-md navbar-light bg-faded ${navColorClass}`}>
            <div className="container">
                <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <a className="navbar-brand" href="/">Guorient</a>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link" href="/maps">Maps</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

Navigation.propTypes = propTypes;

export default Navigation;
