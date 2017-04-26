import dismissKeyboard from 'dismissKeyboard';
import React, { Component } from 'react';
import {
  Text,
  TextInput,
  TouchableHighlight,
  View,
  StyleSheet,
  AlertIOS,
} from 'react-native';

const Error = (props) => {
  return (
    <Text style={styles.error}>{props.message}</Text>
  );
}

export default class AddPlace extends Component {
  constructor() {
    super();
    const _this = this;
    navigator.geolocation.getCurrentPosition((position) => {
      let initialPosition = JSON.stringify(position);
      lat = position.coords.latitude;
      lng = position.coords.longitude;
      _this.position = {
        latitude: lat,
        longitude: lng,
      };
    }, (error) => alert(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
    this.state = {
      title: '',
      latitude: '',
      longitude: '',
      titleError: '',
      latitudeError: '',
      longitudeError: ''
    };
  }

  handleUseCurrentLocation() {
    this.setState({
      latitude: this.position.latitude,
      longitude: this.position.longitude,
    });
  }

  handleAddPlace() {
    const { title, latitude, longitude } = this.state;
    let titleError = '';
    let latitudeError = '';
    let longitudeError = '';
    if (!title) {
      titleError = 'Name is required.';
    }
    if (!latitude) {
      latitudeError = 'Latitude is required.';
    }
    if (!longitude) {
      longitudeError = 'Longitude is required.';
    }

    this.setState({
      titleError,
      latitudeError,
      longitudeError
    });

    const isError = titleError || latitudeError || longitudeError;
    if (!isError) {
      this.props.onAddPlace({
        title,
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude)
      });

      AlertIOS.alert(
        'Place added',
        'Your place is added to the map. Click on the Favorites tab to view.'
        );
    }

    dismissKeyboard();
  }

  render() {
    return (
      <View style={styles.view}>
        <Text style={styles.text}>Title</Text>
        <TextInput
          style={styles.textInput}
          value={this.state.title}
          onChangeText={(title) => this.setState({ title })}
        >
        </TextInput>
        <Error message={this.state.titleError} />

        <Text style={styles.text}>Latitude</Text>
        <TextInput
          keyboardType="numbers-and-punctuation"
          style={styles.textInput}
          value={this.state.latitude.toString()}
          onChangeText={(latitude) => this.setState({ latitude })}
        ></TextInput>
        <Error message={this.state.latitudeError} />

        <Text style={styles.text}>Longitude</Text>
        <TextInput
          keyboardType="numbers-and-punctuation"
          style={styles.textInput}
          value={this.state.longitude.toString()}
          onChangeText={(longitude) => this.setState({ longitude })}
        ></TextInput>
        <Error message={this.state.longitudeError} />

        <TouchableHighlight
          style={styles.button}
          onPress={this.handleUseCurrentLocation.bind(this)}
        >
          <Text style={styles.buttonText}>Use Current Location</Text>
        </TouchableHighlight>

        <TouchableHighlight 
          style={styles.buttonPrimary}
          onPress={this.handleAddPlace.bind(this)}
        >
          <Text style={styles.buttonText}>Add Place</Text>
        </TouchableHighlight>
      </View>
      );
  }
}

const styles = StyleSheet.create({
  view: {
    paddingTop: 50,
    paddingLeft: 30,
    paddingRight: 30,
    backgroundColor: '#E3E3E3',
    flex: 1,
  },
  text: {
    color: '#233142',
    marginBottom: 5,
  },
  textInput: {
    height: 40,
    borderColor: '#455D7A',
    borderWidth: 1,
    marginBottom: 5,
  },
  button: {
    backgroundColor: '#F95959',
    padding: 12,
    borderRadius: 6,
    marginBottom: 5,
  },
  buttonPrimary: {
    backgroundColor: '#455D7A',
    padding: 12,
    borderRadius: 6,
    marginBottom: 5,
  },
  buttonText: {
    color: '#FAFAFA',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  }
});