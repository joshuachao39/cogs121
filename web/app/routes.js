import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import FilterableTable from './containers/FilterableTable';
import NewMapContainer from './containers/NewMapContainer';
import MapContainer from './containers/MapContainer';
import About from './components/About';

export default (
	<Route path="/" component={App}>
		<IndexRoute component={FilterableTable} />
		<Route path="/about" component={About} />
    <Route path="maps/new" component={NewMapContainer} />
    <Route path="maps/:mapId" component={MapContainer} />
	</Route>
);
