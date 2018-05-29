import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Rating, Button } from 'react-native-elements';
import { Components, Colors, Fonts } from '../../../constants';
const { MainText, AltText } = Components;

const CompletedQuizView = ({
  cards,
  correct,
  rating,
  restartQuiz,
  backToDeck
}) => (
  <View style={styles.resultsContainer}>
    <MainText style={styles.completedText}>Completed!</MainText>
    <MainText style={{ fontSize: 25, paddingTop: 20 }}>
      <MainText style={{ color: Colors.YELLOW, fontSize: 35, paddingLeft: 10 }}>
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
      onPress={restartQuiz}
      buttonStyle={{ marginTop: 50, backgroundColor: Colors.BLUE }}
    />
    <Button
      title="Back to Deck"
      fontFamily={Fonts.ALT}
      onPress={backToDeck}
      buttonStyle={{
        marginTop: 10,
        backgroundColor: Colors.GREEN
      }}
    />
  </View>
);

const styles = StyleSheet.create({
  completedText: {
    fontSize: 25,
    color: Colors.ALT_GREEN,
    fontWeight: 'bold'
  },
  resultsContainer: {
    flex: 1,
    paddingTop: 30,
    flexDirection: 'column',
    alignItems: 'center'
  }
});

export default CompletedQuizView;
