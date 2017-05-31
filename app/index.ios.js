import React, { Component } from 'react';
import axios from 'axios';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TabBarIOS
} from 'react-native';

import EventMap from './EventMap';
import MapsList from './MapsList';

export default class Places extends Component {
  constructor() {
    super();
    this.state = {
      selectedTab: 1,
      loading: true,
    };

    this.getMaps = this.getMaps.bind(this);
    this.handleMapSelection = this.handleMapSelection.bind(this);
  }

  componentWillMount() {
    this.getMaps();
  }

  getMaps() {
    const _this = this;

    axios.get('https://guorient-backend.herokuapp.com/maps')
      .then((res) => {
        _this.setState({
          loading: false,
          maps: res.data,
        });
        return res.data;
      })
      .catch((error) => {
        console.error(error);
      });
  }

  /**
   * Handles the tab presses in the bottom nav bar
   */
  handleTabPress(tab) {
    this.setState({ selectedTab: tab });
  }

  /**
   * Handles the map selection from the maps page
   */
  handleMapSelection(mapIndex) {
    this.setState({ selectedTab: 0 });
    this.setState({ currMap: this.state.maps[mapIndex] })
  }

  render() {
    const { currMap, loading, maps } = this.state;

    return (
      <TabBarIOS
        unselectedTintColor="white"
        tintColor="#39A4EB"
        unselectedItemTintColor="white"
        barTintColor="#46677D"
      >
        <TabBarIOS.Item
          systemIcon="recents"
          selected={this.state.selectedTab === 0}
          onPress={this.handleTabPress.bind(this, 0)}
        >
          <EventMap
            loading={loading}
            maps={maps}
            currMap={currMap}
          />
        </TabBarIOS.Item>
        <TabBarIOS.Item
          icon={require('./assets/icons/list_icon.png')}
          title=" List"
          selected={this.state.selectedTab === 1}
          onPress={this.handleTabPress.bind(this, 1)}
        >
          <Image source={require('./assets/img/gradient-background.png')} style={styles.backgroundImage}>
            <MapsList
              loading={loading}
              maps={maps}
              handleMapSelection={this.handleMapSelection}
            />
          </Image>
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  }
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: null,
    height: null
  },
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
