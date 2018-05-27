import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { addDeck } from '../../actions/deckActions';
import uuidv1 from 'uuid/v1';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  FormLabel,
  FormInput,
  FormValidationMessage,
  Button
} from 'react-native-elements';

class AddDeck extends Component {
  state = {
    name: '',
    category: '',
    description: '',
    cards: []
  };

  createDeck = () => {
    const { onAddDeck, navigation } = this.props;
    const deck = {
      ...this.state,
      id: uuidv1()
    };
    onAddDeck(deck);
    navigation.navigate('Decks');
  };

  render() {
    return (
      <View style={styles.container}>
        <FormLabel>Name</FormLabel>
        <FormInput
          value={this.state.name}
          onChangeText={e => this.setState({ name: e })}
        />
        <FormValidationMessage />
        <FormLabel>Category</FormLabel>
        <FormInput
          value={this.state.category}
          onChangeText={e => this.setState({ category: e })}
        />
        <FormValidationMessage />
        <FormLabel>Description</FormLabel>
        <FormInput
          value={this.state.description}
          onChangeText={e => this.setState({ description: e })}
        />
        <FormValidationMessage />
        <Button
          title="Submit"
          backgroundColor={'#22A7F0'}
          onPress={this.createDeck}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start'
  }
});

const mapDispatchToProps = dispatch => ({
  onAddDeck: deck => dispatch(addDeck(deck))
});

export default connect(null, mapDispatchToProps)(AddDeck);
