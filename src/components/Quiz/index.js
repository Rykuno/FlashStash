import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card, Button, Rating } from 'react-native-elements';

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
    this.setState({
      [answer]: this.state[answer] + 1,
      counter: this.state.counter + 1
    });
  };

  showAnswer = () => {
    this.setState({
      showAnswer: true
    });
  };

  quizView = () => {
    const { cards, counter, showAnswer } = this.state;
    return (
      <View>
        <Text style={styles.progressCurrent}>
          {counter + 1}
          <Text style={styles.progressTotal}>/{cards.length}</Text>
        </Text>
        <Card title={cards[counter].question}>
          {showAnswer && (
            <Text style={{ textAlign: 'center' }}>{cards[counter].answer}</Text>
          )}
        </Card>
        <Button
          title="Show Answer"
          onPress={this.showAnswer}
          backgroundColor={'#22A7F0'}
          style={styles.correctButton}
        />
        <Button
          title="Correct"
          onPress={() => this.submitAnswer('correct')}
          icon={{ name: 'check' }}
          backgroundColor={'#66da50'}
          style={styles.correctButton}
        />
        <Button
          title="Incorrect"
          icon={{ name: 'clear' }}
          onPress={() => this.submitAnswer('incorrect')}
          backgroundColor={'#f10056'}
          style={styles.incorrectButton}
        />
      </View>
    );
  };

  restartQuiz = () => {
    this.setState({
      counter: 0
    });
  };

  completedQuizView = () => {
    const { cards, counter, correct, incorrect } = this.state;
    const rating = correct / counter * 5;

    return (
      <View style={styles.resultsContainer}>
        <Text style={{ fontSize: 25, color: '#37AB61', fontWeight: 'bold' }}>
          Completed!
        </Text>
        <Text style={{ fontSize: 25, paddingTop: 20 }}>
          <Text style={{ color: '#EEC149', fontSize: 35, paddingLeft: 10 }}>
            {correct}
          </Text>
          <Text style={{ fontSize: 25 }}>/{cards.length}</Text>
        </Text>
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
          onPress={this.restartQuiz}
          buttonStyle={{ marginTop: 50, backgroundColor: '#22A7F0' }}
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
    color: '#22A7F0'
  },
  progressTotal: {
    fontSize: 15,
    color: 'black'
  },
  incorrectButton: {
    paddingTop: 10
  },
  correctButton: {
    paddingTop: 40
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

export default Quiz;
