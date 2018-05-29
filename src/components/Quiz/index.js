import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card, Button, Rating } from 'react-native-elements';
import { connect } from 'react-redux';
import {
  clearLocalNotification,
  setLocalNotification
} from '../../utility/helpers';
import { setScore } from '../../actions/deckActions';
import { Fonts, Components, Colors, Routes } from '../../constants';
const { MainText, AltText } = Components;

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

  quizView = () => {
    const { cards, counter, showAnswer } = this.state;
    const currentCard = cards[counter];

    return (
      <View>
        <AltText style={styles.progressCurrent}>
          {counter + 1}
          <AltText style={styles.progressTotal}>/{cards.length}</AltText>
        </AltText>
        <Card title={currentCard.question}>
          {showAnswer && (
            <MainText style={{ textAlign: 'center' }}>
              {currentCard.answer}
            </MainText>
          )}
        </Card>
        <Button
          title="Show Answer"
          onPress={this.showAnswer}
          backgroundColor={Colors.BLUE}
          fontFamily={Fonts.ALT}
          style={styles.correctButton}
        />
        <Button
          title="Correct"
          onPress={() => this.submitAnswer('correct')}
          icon={{ name: 'check' }}
          backgroundColor={Colors.GREEN}
          fontFamily={Fonts.ALT}
          style={styles.correctButton}
        />
        <Button
          title="Incorrect"
          icon={{ name: 'clear' }}
          onPress={() => this.submitAnswer('incorrect')}
          backgroundColor={Colors.RED}
          fontFamily={Fonts.ALT}
          style={styles.incorrectButton}
        />
      </View>
    );
  };

  completedQuizView = () => {
    const { cards, counter, correct, incorrect } = this.state;
    const rating = correct / counter * 5;

    /* I figured due to the  immense small customizations
    happening within this View, I'd just style inline instead of 
    cluttering the StyleSheet. Not sure if this is the right move 
    so I'll come back to it later*/
    return (
      <View style={styles.resultsContainer}>
        <MainText
          style={{ fontSize: 25, color: Colors.ALT_GREEN, fontWeight: 'bold' }}
        >
          Completed!
        </MainText>
        <MainText style={{ fontSize: 25, paddingTop: 20 }}>
          <MainText
            style={{ color: Colors.YELLOW, fontSize: 35, paddingLeft: 10 }}
          >
            {correct}
          </MainText>
          <MainText style={{ fontSize: 25 }}>/{cards.length}</MainText>
        </MainText>
        <Rating
          showrating
          readonly
          fractions={1}
          type="custom"
          startingValue={rating}
          style={{ paddingTop: 20 }}
        />
        <Button
          title="Restart Quiz"
          fontFamily={Fonts.ALT}
          onPress={this.restartQuiz}
          buttonStyle={{ marginTop: 50, backgroundColor: Colors.BLUE }}
        />
        <Button
          title="Back to Deck"
          fontFamily={Fonts.ALT}
          onPress={this.backToDeck}
          buttonStyle={{
            marginTop: 10,
            backgroundColor: Colors.GREEN
          }}
        />
      </View>
    );
  };

  getProgress = () => {
    const { cards, counter } = this.state;
    return `${counter}/${cards.length}`;
  };

  render() {
    const { cards, counter } = this.state;
    return (
      <View style={styles.container}>
        {cards.length > counter ? this.quizView() : this.completedQuizView()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  progressCurrent: {
    marginLeft: 20,
    fontSize: 25,
    color: Colors.BLUE
  },
  progressTotal: {
    fontSize: 15,
    color: 'black'
  },
  incorrectButton: {
    marginTop: 10
  },
  correctButton: {
    marginTop: 40
  },
  container: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: 'white'
  },
  resultsContainer: {
    flex: 1,
    paddingTop: 30,
    flexDirection: 'column',
    alignItems: 'center'
  }
});

const mapDispatchToProps = dispatch => ({
  onSetScore: (id, score) => dispatch(setScore(id, score))
});

export default connect(null, mapDispatchToProps)(Quiz);
