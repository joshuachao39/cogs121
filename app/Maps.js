import React, { Component } from 'react';
import {
  Linking,
  View,
  StyleSheet,
  Text,
  TouchableHighlight,
} from 'react-native';

import mapsData from './mapsData';

export default class Maps extends Component {
  constructor(props){
    super(props);
    this.state.name=[''];
  }

  // data = mapsData.parse(text);
  // list = data.name;
  render(){
    // for (i=0;i<mapsData.length;i++){
    //   //generate different object each time
    // }
    this.state.name.add(mapsData[0].name);
    let name1 = mapsData[1].name;
    let name2 = mapsData[2].name;
    return (
      <View style={styles.view}>
        <TouchableHighlight /*onPress={/*some linking function}*/>
        <Text>{name0}</Text>
        </TouchableHighlight>

        <TouchableHighlight /*onPress={/*some linking function}*/>
        <Text>{name1}</Text>
        </TouchableHighlight>

        <TouchableHighlight /*onPress={/*some linking function}*/>
        <Text>{name2}</Text>
        </TouchableHighlight>
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
  $TouchableHighlight: {
    backgroundColor: '#a3daff',
    padding: 12,
    borderRadius: 6,
    marginBottom: 5,
  }
});
