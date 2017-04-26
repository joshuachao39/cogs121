/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TabBarIOS
} from 'react-native';

import PlaceMap from './place_map';
import AddPlace from './add_place';

export default class Places extends Component {
  constructor() {
    super();
    this.state = {
      selectedTab: 0,
      annotations: [
        {
          title: 'Smithsonian Museum',
          latitude: 38.8980,
          longitude: -77.0230
        },
        {
          title: 'UMCP',
          latitude: 38.9869,
          longitude: -76.9426
        },
        {
          title: 'Arlington',
          latitude: 38.8783,
          longitude: -77.0687
        },
        {
          title: 'Little Falls Park',
          latitude: 38.942877,
          longitude: -77.107268
        }
      ],
    };
  }
  
  handleAddPlace(annotation) {
    const annotations = this.state.annotations.slice();
    annotations.push(annotation);
    this.setState({ annotations });
  }

  handleTabPress(tab) {
    this.setState({ selectedTab: tab })
  }

  render() {
    return (
      <TabBarIOS>
        <TabBarIOS.Item
          systemIcon="favorites"
          selected={this.state.selectedTab === 0}
          onPress={this.handleTabPress.bind(this, 0)}
        >
          <PlaceMap annotations={this.state.annotations} />
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title="Place   "
          icon={require('./assets/pin.png')}
          selected={this.state.selectedTab === 1}
          onPress={this.handleTabPress.bind(this, 1)}
        >
          <AddPlace onAddPlace={this.handleAddPlace.bind(this)} />
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  text: {
    textAlign: 'center',
    color: '#333333',
    marginTop: 50,
  },
  view: {
    backgroundColor: '#fed',
    flex: 1
  },
});

AppRegistry.registerComponent('Places', () => Places);
