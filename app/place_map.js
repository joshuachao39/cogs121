import React, { Component } from 'react';
import {
  Linking,
  View,
  StyleSheet,
  Text,
  TouchableHighlight,
} from 'react-native';

//airbnb map
import MapView, {Polygon} from 'react-native-maps';
import {mapsData} from './mapsData';

export default class PlaceMap extends Component {
  constructor(props) {
    super(props);
    let lat = 0;
    let lng = 0;
    const _this = this;

    // navigator.geolocation.getCurrentPosition((position) => {
    //   let initialPosition = JSON.stringify(position);
    //   lat = position.coords.latitude;
    //   lng = position.coords.longitude;
    //   _this.region = {
    //     latitude: lat,
    //     longitude: lng,
    //     latitudeDelta: 0.001,
    //     longitudeDelta: 0.001,
    //     title: "Current Location",
    //   };
    // }, (error) => alert(error.message),
    //   {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    // );

    this.initialRegion = {
      latitude: 32.885231,
      longitude: -117.239119,
      latitudeDelta: 0.02,
      longitudeDelta: 0.02,
      title: "RIMAC",
    };

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

  // onRegionChange(region) {
  //   this.setState({ region });
  // }

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

    const interestsSD = mapsData[0].points.map((elem)=>{
      const coords = elem.boundary.points;
      return (<Polygon coordinates={coords} strokeColor={'rgba(17,205,134,0.5)'}
      fillColor={'rgba(17,205,134,0.5)'} />);
    });

    const interestsCgs121 = mapsData[2].points.map((elem)=>{
      const coords = elem.boundary.points;
      return (<Polygon coordinates={coords} strokeColor={'rgba(17,205,134,0.5)'}
      fillColor={'rgba(17,205,134,0.5)'} />);
    });

    return (
      <View style={styles.view}>
        <MapView
          style={styles.map}
          initialRegion= {this.initialRegion}
          onRegionChange={this.onRegionChange}
          >
          <Polygon coordinates={mapsData[0].boundary.points}/>
          {interestsSD}
          <Polygon coordinates={mapsData[2].boundary.points}/>
          {interestsCgs121}
          </MapView>
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
