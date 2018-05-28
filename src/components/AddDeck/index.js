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

class AddDeck extends Component {
  state = {
    name: '',
    category: '',
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

  verifyInput = form => {
    let { name, category } = this.state;
    name = name.trim();
    category = category.trim();

    switch (form) {
      case 'name':
        return name.trim() ? '' : 'Name is required';
      case 'category':
        return category.trim() ? '' : 'Category is required';
      default:
        break;
    }
  };

  submitButtonDisabled = () => {
    const nameVerified = this.verifyInput('name');
    const categoryVerified = this.verifyInput('category');
    return !nameVerified && !categoryVerified ? false : true;
  };

  render() {
    return (
      <KeyboardAvoidingView style={styles.container}>
        <FormLabel>Name</FormLabel>
        <FormInput
          value={this.state.name}
          onChangeText={e => this.setState({ name: e })}
        />
        <FormValidationMessage>
          {this.verifyInput('name')}
        </FormValidationMessage>
        <FormLabel>Category</FormLabel>
        <FormInput
          value={this.state.category}
          onChangeText={e => this.setState({ category: e })}
        />
        <FormValidationMessage>
          {this.verifyInput('category')}
        </FormValidationMessage>
        <Button
          title="Submit"
          icon={{ name: 'check' }}
          disabled={this.submitButtonDisabled()}
          backgroundColor={'#22A7F0'}
          onPress={this.createDeck}
          style={styles.submitButton}
        />
      </KeyboardAvoidingView>
    );
  }
}

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
