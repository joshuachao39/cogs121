import React, { PropTypes } from 'react';

const App = ({ children }) =>
    <div>
        <nav className="navbar navbar-toggleable-md navbar-light bg-faded">
            <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <a className="navbar-brand" href="/">Guorient</a>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item active">
                        <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
                    </li>
                </ul>
            </div>
        </nav>
        <div className="container-fluid">
            { children }
        </div>
        <footer />
    </div>;

App.propTypes = {
    children: PropTypes.object
};

export default App;
