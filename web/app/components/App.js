import React, { PropTypes } from 'react';

const App = ({ children }) =>
    <div>
        <div>
            { children }
        </div>
        <footer />
    </div>;

App.propTypes = {
    children: PropTypes.object
};

export default App;
