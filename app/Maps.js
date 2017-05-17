import React, { Component } from 'react';
import {
  Linking,
  View,
  StyleSheet,
  Text,
  TouchableHighlight,
} from 'react-native';

export default class Maps extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: [],
      loading: true,
    };

    this.getMaps = this.getMaps.bind(this);
  }

  componentWillMount() {
    this.getMaps();
  }

  getMaps() {
    const _this = this;

    fetch('http://localhost:8000/maps')
      .then((res) => {
        _this.setState({ 
          loading: false,
          maps: JSON.parse(res._bodyText),
        });
        return JSON.parse(res._bodyText);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    if (this.state.loading) {
      return <Text>Loading...</Text>
    }

    const { maps } = this.state;

    const mapList = maps.map(function(elem){
      return (
      <TouchableHighlight
        style={styles.TouchableHighlight}
        key={elem.name}
        /*onPress={/*some linking function}*/
      >
        <Text>{elem.name}</Text>
      </TouchableHighlight>);
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
