import React, { Component } from 'react';
import {
  Linking,
  View,
  StyleSheet,
  Text,
  TouchableHighlight,
} from 'react-native';

import MapView, { Polygon } from 'react-native-maps';

export default class MapsList extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: [],
      showType: 'tiles',
    };

    this.renderTabBar = this.renderTabBar.bind(this);
    this.renderMapList = this.renderMapList.bind(this);
  }

  handleOnPress(i) {
    this.props.handleMapSelection(i);
  }

  setViewType(type) {
    this.setState({ showType: type });
  }

  renderTabBar() {
    const listTabStyles = [styles.topTabBarButton];
    const listTabTextStyles = [styles.topTabBarText];

    const tileTabStyles = [styles.topTabBarButton];
    const tileTabTextStyles = [styles.topTabBarText];

    if (this.state.showType === 'list') {
      listTabStyles.push(styles.topTabBarButtonActive);
      listTabTextStyles.push(styles.topTabBarTextActive);
    } else {
      tileTabStyles.push(styles.topTabBarButtonActive);
      tileTabTextStyles.push(styles.topTabBarTextActive);
    }

    return (
      <View style={styles.topTabBarWrapper}>
        <TouchableHighlight
          style={listTabStyles}
          onPress={() => this.setViewType('list')}
        >
          <Text style={listTabTextStyles}>List</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={tileTabStyles}
          onPress={() => this.setViewType('tiles')}
        >
          <Text style={tileTabTextStyles}>Tiles</Text>
        </TouchableHighlight>
      </View>
    );
  }

  /**
   * Renders the list of maps, differing based on
   * what current view is selected
   */
  renderMapList() {
    const { maps } = this.props;
    const _this = this;
    // to remove
    filter = "SD";

    return maps.map(function(elem, i){
      const nameLC = elem.name.toLowerCase();
      const filterLC = filter.toLowerCase();

      if (nameLC.search(filterLC) !== -1) {
        if (_this.state.showType === 'list') {
          return (
            <TouchableHighlight
              style={styles.TouchableHighlight}
              key={elem.name}
              onPress={() => _this.handleOnPress(i)}
            >
              <Text style={styles.touchableHighlightText}>{elem.name}</Text>
            </TouchableHighlight>
          );
        } else {
          const coords = {
            latitude: elem.coords.lat,
            longitude: elem.coords.lng,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          };

          const borderPoints = elem.boundary.points.map((pt) => {
            return {
              latitude: pt.lat,
              longitude: pt.lng,
            };
          });

          return (
            <TouchableHighlight
              style={styles.tileTouchableHighlight}
              key={elem.name}
              onPress={() => _this.handleOnPress(i)}
            >
              <View>
                <MapView
                  style={styles.map}
                  region={coords}
                >
                  <Polygon coordinates={borderPoints} />
                </MapView>
                <Text style={styles.tileTouchableHighlightText}>{elem.name}</Text>
              </View>
            </TouchableHighlight>
          )
        }
      }
    });
  }

  render() {
    if (this.props.loading) {
      return <Text>Loading...</Text>
    }

    return (
      <View style={styles.view}>
        <Text style={styles.header}>
          Guorient
        </Text>
        {this.renderTabBar()}
        {this.renderMapList()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    height: 170,
  },
  tileTouchableHighlight: {
    height: 200,
    backgroundColor: '#FAFAFA',
  },
  tileTouchableHighlightText: {
    padding: 10,
    color: '#46677D',
  },
  view: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 30,
    flex: 1,
  },
  topTabBarWrapper: {
    flexDirection: 'row',
    height: 26,
    marginBottom: 8,
  },
  topTabBarButton: {
    flex: 1,
    borderBottomColor: '#FAFAFA',
    borderBottomWidth: 2,
  },
  topTabBarButtonActive: {
    borderBottomColor: '#EB3986',
  },
  topTabBarTextActive: {
    color: '#EB3986',
  },
  topTabBarText: {
    textAlign: 'center',
    color: '#FAFAFA',
    fontSize: 16,
  },
  TouchableHighlight: {
    backgroundColor: '#FAFAFA',
    padding: 16,
    marginBottom: 8,
  },
  touchableHighlightText: {
    fontSize: 16,
    color: '#46677D',
  },
  text: {
    color: '#46677D',
  },
  header: {
    backgroundColor: 'transparent',
    color: '#FAFAFA',
    fontSize: 20,
    marginBottom: 20,
  }
});
