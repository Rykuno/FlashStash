import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Card } from 'react-native-elements';

class Quiz extends Component {
  state = {
    cards: undefined
  };

  componentWillMount() {
    const { cards } = this.props.navigation.state.params;
    console.log(cards);
    this.setState({ cards });
  }

  render() {
    return (
      <View>
        <Text>Quiz</Text>
        <Text>{this.state.cards.length}</Text>
      </View>
    );
  }
}

export default Quiz;
