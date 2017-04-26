import React, { Component } from 'react';
import {
  MapView,
  Linking,
  View,
  StyleSheet,
  Text,
  TouchableHighlight,
} from 'react-native';

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
        latitudeDelta: 0.2,
        longitudeDelta: 0.2,
        title: "Current Location",
      };
      // alert(JSON.stringify(position));
    }, (error) => alert(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
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
          region={this.region}
          annotations={annotations}
        />
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