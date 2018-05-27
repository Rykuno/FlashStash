import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Avatar, Divider, Button, Badge } from 'react-native-elements';
import { connect } from 'react-redux';

class IndividualDeck extends Component {
  addCard = id => {
    const { navigation } = this.props;
    navigation.navigate('AddCard', { id: id });
  };

  startQuiz = deck => {
    const { navigation } = this.props;
    navigation.navigate('Quiz', deck);
  };

  render() {
    const { deck } = this.props;
    const { name, id, description, category, cards } = deck;
    console.log('STATE: ', this.props.deck.cards.length);

    return (
      <View style={styles.container}>
        <Avatar
          containerStyle={styles.avatar}
          xlarge
          rounded
          title="BP"
          activeOpacity={0.7}
        />
        <Text style={styles.title}>{name}</Text>
        <Divider style={styles.divider} />
        <View style={styles.badgeView}>
          <Badge containerStyle={styles.badge}>
            <Text>{category}</Text>
          </Badge>
          <Badge containerStyle={styles.badge}>
            <Text>Cards: {this.props.deck.cards.length}</Text>
          </Badge>
        </View>
        <Divider style={styles.divider} />
        <Button
          title="Add Card"
          backgroundColor={'#22A7F0'}
          onPress={() => this.addCard(id)}
          buttonStyle={styles.button}
        />
        <Button
          title="Start Quiz"
          onPress={() => this.startQuiz(deck)}
          backgroundColor={'#64DD17'}
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

const mapStateToProps = (state, ownProps) => ({
  deck: state.decks.decks.find(
    obj => obj.id === ownProps.navigation.state.params.id
  )
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(IndividualDeck);
