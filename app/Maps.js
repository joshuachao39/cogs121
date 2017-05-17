import React, { Component } from 'react';
import {
  Linking,
  View,
  StyleSheet,
  Text,
  TouchableHighlight,
} from 'react-native';

import { mapsData } from './mapsData';

export default class Maps extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: []
    };
  }


  // data =mapsData.parse(text);
  // list = data.name;
  render(){
    //  use arraylist to visualize all data entries
    //   //generate different object each time
    // }

    const mapList =  mapsData.map(function(elem){
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
