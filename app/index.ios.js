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

const interestingRegions = [
  {
    title: "Humanities and Social Sciences Building",
    latitude: 32.878336,
    longitude: -117.241648,
  },
  {
    title: "Geisel Library",
    latitude: 32.881174,
    longitude: -117.237453,
  },
  {
    title: "Price Center Theater",
    latitude: 32.879912,
    longitude: -117.237110,
  },
  {
    tilte: "Cognitive Science Building",
    latitude: 32.880546,
    longitude: -117.239459,
  }
];

const SFInterestingRegions = [
  {
    title: "Magic Bus San Francisco",
    latitude: 37.7882811,
    longitude: -122.4071982
  },
  {
    title: "Apple Union Square",
    latitude: 37.7882811,
    longitude: -122.4071982
  },
  {
    title: "Neiman Marcus",
    latitude: 37.7882811,
    longitude: -122.4071982
  },
  {
    title: "Chipotle Mexican Grill",
    latitude: 37.7881016,
    longitude: -122.4087334
  }
];

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
        }
      ],
      annotations: SFInterestingRegions,
      // annotations: [
        // {
        //   title: 'Smithsonian Museum',
        //   latitude: 38.8980,
        //   longitude: -77.0230
        // },
        // {
        //   title: 'UMCP',
        //   latitude: 38.9869,
        //   longitude: -76.9426
        // },
        // {
        //   title: 'Arlington',
        //   latitude: 38.8783,
        //   longitude: -77.0687
        // }
      // ],

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
