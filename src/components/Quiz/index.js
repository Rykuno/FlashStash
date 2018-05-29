import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import {
  clearLocalNotification,
  setLocalNotification
} from '../../utility/helpers';
import { setScore } from '../../actions/deckActions';
import { Fonts, Components, Colors, Routes } from '../../constants';
const { MainText, AltText } = Components;
import CompletedQuizView from './CompletedView';
import InProgressQuizView from './InProgressView';

class Quiz extends Component {
  state = {
    cards: {},
    showAnswer: false,
    counter: 0,
    correct: 0,
    incorrect: 0
  };

  componentWillMount() {
    const { cards } = this.props.navigation.state.params.cards;
    this.setState({ cards });
  }

  submitAnswer = answer => {
    this.setState(
      {
        [answer]: this.state[answer] + 1,
        counter: this.state.counter + 1,
        showAnswer: false
      },
      () => {
        if (this.state.counter === this.state.cards.length) {
          this.setScore();
          this.resetNotifications();
        }
      }
    );
  };

  showAnswer = () => {
    this.setState({
      showAnswer: true
    });
  };

  setScore = () => {
    const { id } = this.props.navigation.state.params;
    const { onSetScore } = this.props;
    const { incorrect, correct } = this.state;
    const scorePercentage = correct / (incorrect + correct) * 100;
    onSetScore(id, scorePercentage);
  };

  restartQuiz = () => {
    this.setState({
      counter: 0,
      correct: 0,
      incorrect: 0
    });
  };

  backToDeck = () => {
    const { navigation } = this.props;
    navigation.pop();
  };

  resetNotifications = () => {
    clearLocalNotification().then(setLocalNotification());
  };

  getProgress = () => {
    const { cards, counter } = this.state;
    return `${counter}/${cards.length}`;
  };

  render() {
    const { cards, counter, correct, incorrect, showAnswer } = this.state;
    const rating = correct / counter * 5;
    const currentCard = cards[counter];

    return (
      <View style={styles.container}>
        {cards.length > counter ? (
          <InProgressQuizView
            currentCard={currentCard}
            counter={counter}
            cards={cards}
            answerRevealed={showAnswer}
            showAnswer={this.showAnswer}
            submitAnswer={answer => this.submitAnswer(answer)}
          />
        ) : (
          <CompletedQuizView
            cards={cards}
            correct={correct}
            rating={rating}
            restartQuiz={this.restartQuiz}
            backToDeck={this.backToDeck}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: 'white'
  }
});

const mapDispatchToProps = dispatch => ({
  onSetScore: (id, score) => dispatch(setScore(id, score))
});

export default connect(null, mapDispatchToProps)(Quiz);
