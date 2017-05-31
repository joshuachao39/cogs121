import React, { Component } from 'react';
import {
  Linking,
  View,
  StyleSheet,
  Text,
  TouchableHighlight,
} from 'react-native';

//airbnb map
import MapView, { Polygon } from 'react-native-maps';

export default class EventMap extends Component {
  constructor(props) {
    super(props);

    this.watchID = navigator.geolocation.watchPosition((position) => {
      var lastPosition = JSON.stringify(position);
      this.setState({
        lastPosition,
        position,
      });
    });

    this.state = {
      region: {
        latitude: this.props.currMap.coords.lat,
        longitude: this.props.currMap.coords.lng,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      },
      receivedProps: false,
    };

    this.onRegionChange = this.onRegionChange.bind(this);
    this.handleOnPress = this.handleOnPress.bind(this);
  }

  handleNavigation(la, lo) {
    const rla = this.region.latitude;
    const rlo = this.region.longitude;
    const url = `http://maps.apple.com/?saddr=${rla},${rlo}&daddr=${la},${lo}&dirflg=d`;
    return Linking.openURL(url);
  }

  onRegionChange(region) {
    if (this.state.receivedProps) {
      this.setState({ region });
    }
  }

  componentWillReceiveProps(nextProps) {
    const region = {
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
      latitude: nextProps.currMap.coords.lat,
      longitude: nextProps.currMap.coords.lng,
    }

    this.setState({
      region,
      receivedProps: true,
    });
  }

  handleOnPress(i){
  //   const {currMap} = this.props;
  //   var gju = require('geojson-utils');
  //   const
  //   // map function for each Polygon(boundary)
  //   //   map function for points of interest
  //   //     if the point is in this polygon
  //       if gju.pointInPolygon({"type":"Point","coordinates":i},
  //                 {"type":"Polygon", "coordinates":/*this polygon*/})
  //       //add a marker to the map with a big name of the POI
  //   //if the point is within boundary but not in subregions
  //   if /*not having something happening with points*/ && gju.pointInPolygon()
  //       //add a marker to the map with a big name of the boundary
    console.log(i);
  }

  render() {
    const { currMap, maps, loading } = this.props;
    const _this = this;

    if (loading) {
      return <Text>Loading...</Text>;
    }

    const interests = currMap.points.map((pts) => {
      // Generate coords
      const coords = pts.boundary.points.map((pt) => {
        return {
          latitude: pt.lat,
          longitude: pt.lng,
        }
      });

      return (
        <Polygon
          key={JSON.stringify(coords)}
          coordinates={coords}
          strokeColor={'rgba(17,205,134,0.5)'}
          fillColor={'rgba(17,205,134,0.5)'}
          onPress={_this.handleOnPress}
        />
      );
    });

    const borderPoints = currMap.boundary.points.map((pt) => {
      return {
        latitude: pt.lat,
        longitude: pt.lng,
      };
    });

    const coords = {
      latitude: currMap.coords.lat,
      longitude: currMap.coords.lng,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };

    // alert(JSON.stringify(coords));
    // alert(JSON.stringify(this.state.region));

    return (
      <MapView
        style={styles.map}
        region={this.state.region}
        initialRegion={coords}
        onRegionChange={this.onRegionChange}
      >
        <Polygon coordinates={borderPoints} />
        {interests}
      </MapView>
    );

    return (
      <View style={styles.view}>
        {eventMap}
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
