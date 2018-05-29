import React, { Component } from 'react';
import {
  KeyboardAvoidingView,
  Text,
  TextInput,
  StyleSheet
} from 'react-native';
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
import { Routes, Colors } from '../../constants';

class AddDeck extends Component {
  state = {
    name: '',
    category: '',
    previousScore: 0,
    cards: []
  };

  createDeck = () => {
    const { INDIVIDUAL_DECK } = Routes;
    const { onAddDeck, navigation } = this.props;

    //Add a uuid to the deck
    const deck = {
      ...this.state,
      id: uuidv1()
    };

    //Add the deck to redux store and navigate to its Indivdual Deck view.
    onAddDeck(deck);
    navigation.replace(INDIVIDUAL_DECK, { id: deck.id });
  };

  verifyInput = type => {
    const { name, category } = this.state;
    switch (type) {
      case InputType.NAME:
        return name.trim() ? '' : 'Name is required';
      case InputType.CATEGORY:
        return category.trim() ? '' : 'Category is required';
      default:
        break;
    }
  };

  submitButtonDisabled = () => {
    const nameVerified = this.verifyInput(InputType.NAME);
    const categoryVerified = this.verifyInput(InputType.CATEGORY);
    return !nameVerified && !categoryVerified ? false : true;
  };

  render() {
    const { name, category } = this.state;

    return (
      <KeyboardAvoidingView style={styles.container}>
        {/* Name Form Input */}
        <FormLabel>Name</FormLabel>
        <FormInput
          value={name}
          onChangeText={name => this.setState({ name })}
        />
        <FormValidationMessage>
          {this.verifyInput(InputType.NAME)}
        </FormValidationMessage>

        {/* Category Form Input */}
        <FormLabel>Category</FormLabel>
        <FormInput
          value={category}
          onChangeText={category => this.setState({ category })}
        />
        <FormValidationMessage>
          {this.verifyInput(InputType.CATEGORY)}
        </FormValidationMessage>

        {/* Submit Button */}
        <Button
          title="Submit"
          icon={{ name: 'check' }}
          disabled={this.submitButtonDisabled()}
          backgroundColor={Colors.BLUE}
          onPress={this.createDeck}
          style={styles.submitButton}
        />
      </KeyboardAvoidingView>
    );
  }
}

const InputType = {
  NAME: 'name',
  CATEGORY: 'category'
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  submitButton: {
    marginTop: 20
  }
});

const mapDispatchToProps = dispatch => ({
  onAddDeck: deck => dispatch(addDeck(deck))
});

export default connect(null, mapDispatchToProps)(AddDeck);
