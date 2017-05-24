import React from 'react';
import { Link } from 'react-router';

const About = () => (
    <div className="gr-featurette">
        <div className="container">
            <div className="row">
                <div className="col-md-6 stretch gr-featurette--text">
                    <div className="vcenter">
                        <h2 className="gr-featurette--title">Guorient</h2>
                        <p className="gr-featurette--subtext">Build interactive event maps. <br />Anywhere.</p>
                        <Link
                            to="maps"
                            className="btn btn-default gr-btn gr-featurette--btn"
                        >
                            Get Started
                        </Link>
                    </div>
                </div>
                <div className="col-md-7 gr-featurette--first">
                </div>
            </div>
            <div className="row">
                <div className="col-md-7 gr-featurette--second">
                </div>
                <div className="col-md-6 gr-featurette--spacer">
                </div>
                <div className="col-md-6 stretch gr-featurette--text">
                    <div className="vcenter">
                        <h2 className="gr-featurette--subtitle">Build interactive<br /> maps easily</h2>
                        <p>Build a map for your venue, conference, or building in minutes</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
);


export default About;
