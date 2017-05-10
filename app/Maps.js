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

    let list=[];
  }

  data = mapsData.parse(text);
  list = data.name;
  render(){
    return (
      <View>
        <Text>Hello</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  View: {
    backgroundColor: '#fed',
    flex: 1
  },
});
