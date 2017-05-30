import React, { Component } from 'react';
import { AppRegistry, TextInput } from 'react-native';

export default class SearchField extends Component {
  constructor(props) {
    super(props);
    this.state = { filter: 'Enter text here' };
  }

  render() {
    return (
      <TextInput
        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        onChangeText={(filter) => this.setState({filter})}
        value={this.state.filter}
      />
    );
  }
}
