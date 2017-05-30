import React, { Component } from 'react';
import { AppRegistry, TextInput, View } from 'react-native';

import MapsList from './MapsList';
import SearchField from './SearchField';

export default class EventsTab extends Component {
  constructor(props) {
    super(props);
    this.state = { filter: 'Enter text here' };
  }

  render() {
    return (
      <View>
        <SearchField/>
        <MapsList
          loading={this.state.loading}
          maps={this.state.maps}
          handleMapSelection={this.handleMapSelection}
        />   
      </View>   
    );
  }
}