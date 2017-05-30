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
    };
  }

  handleOnPress(i) {
    this.props.handleMapSelection(i);
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

      if (nameLC.search(filterLC) != -1) {
        return (
          <TouchableHighlight
            style={styles.TouchableHighlight}
            key={elem.name}
            onPress={() => _this.handleOnPress(i)}
          >
            <Text>{elem.name}</Text>
          </TouchableHighlight>
        );
      }
    });

    return (
      <View style={styles.view}>
        <Text style={styles.header}>
          Guorient
        </Text>
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
  TouchableHighlight: {
    backgroundColor: '#FAFAFA',
    padding: 12,
    marginBottom: 8,
  },
  text: {
    color: '#46677D',
  },
  header: {
    color: '#FAFAFA',
    fontSize: 20,
    marginBottom: 20,
  }
});
