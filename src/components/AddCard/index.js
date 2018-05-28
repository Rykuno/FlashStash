import React, { Component } from 'react';
import { KeyboardAvoidingView, TextInput, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import {
  FormLabel,
  FormInput,
  FormValidationMessage,
  Button
} from 'react-native-elements';
import { addCard } from '../../actions/deckActions';
import { Colors, Routes } from '../../constants';

class AddCard extends Component {
  state = {
    question: '',
    answer: ''
  };

  addCard = () => {
    const { INDIVIDUAL_DECK } = Routes;
    const { id } = this.props.navigation.state.params;
    const { onAddCard, navigation } = this.props;
    onAddCard(id, this.state);
    navigation.navigate(INDIVIDUAL_DECK);
  };

  verifyInput = type => {
    let { question, answer } = this.state;
    switch (type) {
      case InputType.QUESTION:
        return question.trim() ? '' : 'Question is required';
      case InputType.ANSWER:
        return answer.trim() ? '' : 'Answer is required';
      default:
        break;
    }
  };

  submitButtonDisabled = () => {
    const questionVerified = this.verifyInput(InputType.QUESTION);
    const answerVerified = this.verifyInput(InputType.ANSWER);
    return !answerVerified && !questionVerified ? false : true;
  };

  render() {
    const { question, answer } = this.state;

    return (
      <KeyboardAvoidingView enabled style={styles.container}>
        <FormLabel>Question</FormLabel>
        <FormInput
          value={question}
          onChangeText={question => this.setState({ question })}
        />
        <FormValidationMessage>
          {this.verifyInput(InputType.QUESTION)}
        </FormValidationMessage>
        <FormLabel>Answer</FormLabel>
        <FormInput
          value={answer}
          onChangeText={answer => this.setState({ answer })}
        />
        <FormValidationMessage>
          {this.verifyInput(InputType.ANSWER)}
        </FormValidationMessage>
        <Button
          title="Submit"
          backgroundColor={Colors.BLUE}
          disabled={this.submitButtonDisabled()}
          onPress={this.addCard}
          icon={{ name: 'check' }}
          buttonStyle={styles.submitButton}
        />
      </KeyboardAvoidingView>
    );
  }
}

// Enum for Form Input Types
const InputType = {
  QUESTION: 'question',
  ANSWER: 'answer'
};

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
