import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Avatar, Divider, Button, Badge } from 'react-native-elements';
import { connect } from 'react-redux';
import { addCard } from '../../actions/deckActions';

class IndividualDeck extends Component {
  addCard = id => {
    const { navigation } = this.props;
    navigation.navigate('AddCard', { id });
  };

  startQuiz = cards => {
    const { navigation } = this.props;
    navigation.navigate('Quiz', { cards });
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
    const { name, id, description, category, cards } = deck;

    return (
      <View style={styles.container}>
        <Avatar
          containerStyle={styles.avatar}
          xlarge
          rounded
          title={this.getAvatarInitials(name)}
          activeOpacity={0.7}
        />
        <Text style={styles.title}>{name}</Text>
        <Divider style={styles.divider} />
        <View style={styles.badgeView}>
          <Badge containerStyle={styles.badge}>
            <Text>{category}</Text>
          </Badge>
          <Badge containerStyle={styles.badge}>
            <Text>Cards: {cards.length}</Text>
          </Badge>
        </View>
        <Divider style={styles.divider} />
        <Button
          title="Add Card"
          icon={{name: 'add'}}
          backgroundColor={'#22A7F0'}
          onPress={() => this.addCard(id)}
          buttonStyle={styles.button}
        />
        <Button
          title="Start Quiz"
          onPress={() => this.startQuiz(deck)}
          backgroundColor={'#64DD17'}
          icon={{name: 'question-answer'}}
          buttonStyle={styles.button}
          disabled={cards.length === 0 ? true : false}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingTop: 40,
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
  divider: {
    marginTop: 20,
    marginBottom: 20,
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
