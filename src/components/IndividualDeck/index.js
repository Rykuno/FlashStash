import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Avatar, Divider, Button, Badge } from 'react-native-elements';
import { connect } from 'react-redux';
import { addCard } from '../../actions/deckActions';
import { Routes, Colors, Components } from '../../constants';
const { MainText, AltText } = Components;

class IndividualDeck extends Component {
  addCard = id => {
    const { ADD_CARD } = Routes;
    const { navigation } = this.props;
    navigation.navigate(ADD_CARD, { id });
  };

  startQuiz = cards => {
    const { QUIZ } = Routes;
    const { navigation } = this.props;
    const { id } = this.props.navigation.state.params;
    navigation.navigate(QUIZ, { cards, id });
  };

  getDeck = () => {
    const { deck } = this.props;
    return deck.find(obj => obj.id === this.props.navigation.state.params.id);
  };

  getAvatarInitials = name => {
    if (!name) {
      return '';
    }
    const split = name.split(' ');
    return split.length > 1 ? `${split[0][0]}${split[1][0]}` : name[0];
  };

  render() {
    const deck = this.getDeck();
    const { name, id, description, category, cards, previousScore } = deck;

    return (
      <View style={styles.container}>
        <ScrollView
          endFillColor="blue"
          contentContainerStyle={{
            alignItems: 'center',
            justifyContent: 'center'
          }}
          style={{ width: '100%' }}
        >
          <Avatar
            containerStyle={styles.avatar}
            xlarge
            rounded
            title={this.getAvatarInitials(name)}
            activeOpacity={0.7}
          />
          <MainText style={styles.title}>{name}</MainText>
          <Divider style={styles.divider} />
          <View style={styles.badgeView}>
            <Badge containerStyle={styles.categoryBadge}>
              <MainText style={styles.badgeText}>
                Category: <AltText>{category}</AltText>
              </MainText>
            </Badge>
            <Badge containerStyle={styles.cardsBadge}>
              <MainText style={styles.badgeText}>
                Cards: <AltText> {cards.length}</AltText>
              </MainText>
            </Badge>
            <Badge containerStyle={styles.scoreBadge}>
              <MainText style={styles.badgeText}>
                Score: <AltText>{previousScore}%</AltText>
              </MainText>
            </Badge>
          </View>

          <Divider style={styles.divider} />
          <Button
            title="Add Card"
            icon={{ name: 'add' }}
            backgroundColor={Colors.BLUE}
            onPress={() => this.addCard(id)}
            buttonStyle={styles.button}
          />
          <Button
            title="Edit Deck"
            icon={{ name: 'edit' }}
            backgroundColor={Colors.YELLOW}
            onPress={() => {}}
            buttonStyle={styles.button}
          />

          <Button
            title="Start Quiz"
            onPress={() => this.startQuiz(deck)}
            backgroundColor={Colors.GREEN}
            icon={{ name: 'question-answer' }}
            buttonStyle={styles.button}
            disabled={cards.length === 0 ? true : false}
          />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingTop: 20,
    alignItems: 'center',
    backgroundColor: '#f3f3f3'
  },
  avatar: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 32
  },
  button: {
    width: '100%',
    marginBottom: 15
  },
  badgeText: {
    color: 'whitesmoke'
  },
  scoreBadge: {
    backgroundColor: Colors.BLUE,
    margin: 3
  },
  cardsBadge: {
    backgroundColor: Colors.ALT_GREEN,
    margin: 3
  },
  categoryBadge: {
    backgroundColor: Colors.YELLOW,
    margin: 3
  },
  divider: {
    marginTop: 20,
    marginBottom: 30,
    width: '90%',
    backgroundColor: '#c2c2c2'
  },
  badge: {
    backgroundColor: '#c2c2c2',
    margin: 5
  },
  badgeView: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%'
  }
});

const mapStateToProps = state => ({
  deck: state.decks.decks
});

const mapDispatchToProps = dispatch => ({
  onAddCard: card => dispatch(addCard(card))
});

export default connect(mapStateToProps, mapDispatchToProps)(IndividualDeck);
