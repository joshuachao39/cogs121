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

    const mapList = maps.map(function(elem, i){
      return (
        <TouchableHighlight
          style={styles.TouchableHighlight}
          key={elem.name}
          onPress={() => _this.handleOnPress(i)}
        >
          <Text>{elem.name}</Text>
        </TouchableHighlight>
      );
    });

    return (
      <View style={styles.view}>
        {mapList}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    paddingTop: 50,
    paddingLeft:30,
    paddingRight: 30,
    backgroundColor: '#E3E3E3',
    flex: 1
  },
  TouchableHighlight: {
    backgroundColor: '#a3daff',
    padding: 12,
    borderRadius: 6,
    marginBottom: 5,
  }
});
