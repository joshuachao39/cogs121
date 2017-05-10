import React, { Component } from 'react';
import {
  Linking,
  View,
  StyleSheet,
  Text,
  TouchableHighlight,
} from 'react-native';

//airbnb map
var MapView = require('react-native-maps');

export default class PlaceMap extends Component {
  constructor(props) {
    super(props);
    let lat = 0;
    let lng = 0;
    const _this = this;
    navigator.geolocation.getCurrentPosition((position) => {
      let initialPosition = JSON.stringify(position);
      lat = position.coords.latitude;
      lng = position.coords.longitude;
      _this.region = {
        latitude: lat,
        longitude: lng,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
        title: "Current Location",
      };
    }, (error) => alert(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );

    this.watchID = navigator.geolocation.watchPosition((position) => {
      var lastPosition = JSON.stringify(position);
      this.setState({
        lastPosition,
        position,
      });
    });
  }

  handleNavigation(la, lo) {
    const rla = this.region.latitude;
    const rlo = this.region.longitude;
    const url = `http://maps.apple.com/?saddr=${rla},${rlo}&daddr=${la},${lo}&dirflg=d`;
    return Linking.openURL(url);
  }

  render() {
    const { annotations } = this.props;
    annotations.forEach(annotation => {
      annotation.rightCalloutView = (
        <TouchableHighlight
          style={styles.button}
          onPress={this.handleNavigation.bind(this, annotation.latitude, annotation.longitude)}
        >
          <Text style={styles.buttonText}>Navigation</Text>
        </TouchableHighlight>
      );
    });

    return (
      <View style={styles.view}>
        <MapView
          style={styles.map}
          initialRegion={this.region}
        />
          {/*annotations={annotations}*/}
          {/*}//showsUserLocation={true}*/}

      </View>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    flex: 1
  },
  view: {
    backgroundColor: '#fed',
    flex: 1
  },
});
