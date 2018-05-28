import React, { Component } from 'react';
import {
  KeyboardAvoidingView,
  Text,
  TextInput,
  StyleSheet
} from 'react-native';
import { connect } from 'react-redux';
import {
  FormLabel,
  FormInput,
  FormValidationMessage,
  Button
} from 'react-native-elements';
import { addCard } from '../../actions/deckActions';

class AddCard extends Component {
  state = {
    question: '',
    answer: ''
  };

  addCard = () => {
    const { id } = this.props.navigation.state.params;
    const { onAddCard, navigation } = this.props;
    onAddCard(id, this.state);
    navigation.navigate('IndividualDeck');
  };

  verifyInput = form => {
    let { question, answer } = this.state;
    question = question.trim();
    answer = answer.trim();

    switch (form) {
      case 'question':
        return question.trim() ? '' : 'Question is required';
      case 'answer':
        return answer.trim() ? '' : 'Answer is required';
      default:
        break;
    }
  };

  submitButtonDisabled = () => {
    const questionVerified = this.verifyInput('quesiton');
    const answerVerified = this.verifyInput('answer');
    const verified = questionVerified !== '' && answerVerified !== '';
    return verified ? true : false;
  };

  render() {
    return (
      <KeyboardAvoidingView style={styles.container}>
        <FormLabel>Question</FormLabel>
        <FormInput
          value={this.state.question}
          onChangeText={e => this.setState({ question: e })}
        />
        <FormValidationMessage>
          {this.verifyInput('question')}
        </FormValidationMessage>
        <FormLabel>Answer</FormLabel>
        <FormInput
          value={this.state.answer}
          onChangeText={e => this.setState({ answer: e })}
        />
        <FormValidationMessage>
          {this.verifyInput('answer')}
        </FormValidationMessage>
        <Button
          title="Submit"
          backgroundColor={'#22A7F0'}
          disabled={this.submitButtonDisabled()}
          onPress={this.addCard}
          icon={{ name: 'check' }}
          buttonStyle={styles.submitButton}
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
    marginTop: 10
  }
});

const mapDispatchToProps = dispatch => ({
  onAddCard: (id, card) => dispatch(addCard(id, card))
});

export default connect(null, mapDispatchToProps)(AddCard);
