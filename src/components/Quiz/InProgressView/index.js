import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Button } from 'react-native-elements';
import { Components, Colors, Fonts } from '../../../constants';
const { MainText, AltText } = Components;

const InProgressView = ({
  currentCard,
  counter,
  cards,
  answerRevealed,
  showAnswer,
  submitAnswer
}) => (
  <View>
    <AltText style={styles.progressCurrent}>
      {counter + 1}
      <AltText style={styles.progressTotal}>/{cards.length}</AltText>
    </AltText>
    <Card title={currentCard.question}>
      {answerRevealed && (
        <MainText style={{ textAlign: 'center' }}>
          {currentCard.answer}
        </MainText>
      )}
    </Card>
    <Button
      title="Show Answer"
      onPress={showAnswer}
      backgroundColor={Colors.BLUE}
      fontFamily={Fonts.ALT}
      style={styles.correctButton}
    />
    <Button
      title="Correct"
      onPress={() => submitAnswer(AnswerType.CORRECT)}
      icon={{ name: 'check' }}
      backgroundColor={Colors.GREEN}
      fontFamily={Fonts.ALT}
      style={styles.correctButton}
    />
    <Button
      title="Incorrect"
      icon={{ name: 'clear' }}
      onPress={() => submitAnswer(AnswerType.INCORRECT)}
      backgroundColor={Colors.RED}
      fontFamily={Fonts.ALT}
      style={styles.incorrectButton}
    />
  </View>
);

const AnswerType = {
  CORRECT: 'correct',
  INCORRECT: 'incorrect'
};

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
  }
});

export default InProgressView;
