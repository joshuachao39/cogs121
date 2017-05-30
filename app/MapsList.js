import React, { Component } from 'react';
import {
  Linking,
  View,
  StyleSheet,
  Text,
  TouchableHighlight,
} from 'react-native';

export default class MapsList extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: [],
      showType: 'list',
    };
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

  render() {
    if (this.props.loading) {
      return <Text>Loading...</Text>
    }

    const { maps } = this.props;
    const _this = this;

    // to remove
    filter = "SD";

    const mapList = maps.map(function(elem, i){
      const nameLC = elem.name.toLowerCase();
      const filterLC = filter.toLowerCase();

      if (nameLC.search(filterLC) !== -1) {
        return (
          <TouchableHighlight
            style={styles.TouchableHighlight}
            key={elem.name}
            onPress={() => _this.handleOnPress(i)}
          >
            <Text style={styles.touchableHighlightText}>{elem.name}</Text>
          </TouchableHighlight>
        );
      }
    });

    return (
      <View style={styles.view}>
        <Text style={styles.header}>
          Guorient
        </Text>
        {this.renderTabBar()}
        {mapList}
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
