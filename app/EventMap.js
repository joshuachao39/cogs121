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
      mapMarkers: [],
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

  handleOnPress(name, coords){
    console.log(coords);
    let totaLat= 0;
    let totaLng = 0;
    for (let i=0;i<coords.length;i++){
        totaLat = totaLat + coords[i].latitude;
        totaLng = totaLng + coords[i].longitude;
    }
    const center = {
      latitude: totaLat/coords.length,
      longitude: totaLng/coords.length,
    };
    console.log(center);

    this.setState({
      mapMarkers: [
        ...this.state.mapMarkers,
        {
          name,
          center,
        },
      ],
    });
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
          onPress={() => _this.handleOnPress(pts.name, coords)}
        />
      );
    });

    const mapMarkersRendered = this.state.mapMarkers.map((marker) => {
      const { name, center } = marker;
      return (
        <MapView.Marker
          title={name}
          coordinate={center}
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
        {mapMarkersRendered}
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
