import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableWithoutFeedback
} from 'react-native';
import styled from 'styled-components';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import { Card, ListItem, Button, Badge, Avatar } from 'react-native-elements';
import { connect } from 'react-redux';
import { deleteDeck } from '../../actions/deckActions';
import * as Animatable from 'react-native-animatable';
import { Fonts, Routes, Components, Colors } from '../../constants';
const { MainText, AltText } = Components;

class Decks extends Component {
  state = {
    deletionState: false
  };

  selectDeck = deck => {
    const { deletionState } = this.state;
    const { onDeleteDeck } = this.props;
    deletionState ? onDeleteDeck(deck) : this.viewDeckDetail(deck);
  };

  viewDeckDetail = deck => {
    const { INDIVIDUAL_DECK } = Routes;
    const { navigation } = this.props;
    navigation.navigate(INDIVIDUAL_DECK, deck);
  };

  deleteDecks = () => {
    this.setState({
      deletionState: true
    });
  };

  renderDecks = () => {
    const { decks } = this.props;
    const { category, cards, previousScore } = decks;
    const { deletionState } = this.state;

    return decks.map(deck => (
      <TouchableWithoutFeedback
        onPress={() => this.selectDeck(deck)}
        key={deck.id}
        style={styles.listContainer}
      >
        <Animatable.View
          iterationCount="infinite"
          animation={deletionState ? 'pulse' : ''}
        >
          <Card
            title={deck.name}
            fontFamily={Fonts.MAIN}
            containerStyle={deletionState ? styles.cardDeletionState : null}
          >
            <View style={styles.cardBadges}>
              <Badge containerStyle={styles.categoryBadge}>
                <MainText style={styles.badgeText}>
                  Class: <AltText>{deck.category}</AltText>
                </MainText>
              </Badge>
              <Badge containerStyle={styles.cardsBadge}>
                <MainText style={styles.badgeText}>
                  Cards: <AltText>{deck.cards.length}</AltText>
                </MainText>
              </Badge>
              <Badge containerStyle={styles.scoreBadge}>
                <MainText style={styles.badgeText}>
                  Score:<AltText>{deck.previousScore}%</AltText>
                </MainText>
              </Badge>
            </View>
          </Card>
        </Animatable.View>
      </TouchableWithoutFeedback>
    ));
  };

  EmptyListView = () => (
    <View>
      {this.props.decks.length > 0 || (
        <MainText
          style={{
            textAlign: 'center',
            textAlignVertical: 'center',
            marginTop: 50,
            fontWeight: 'normal',
            fontSize: 20
          }}
        >
          Click '+' to add a Study Deck!
        </MainText>
      )}
    </View>
  );

  renderActionButton = () => {
    const { navigation } = this.props;
    const { deletionState } = this.state;

    if (deletionState) {
      return (
        <ActionButton
          buttonColor={deletionState ? '#00c853' : '#f50057'}
          onPress={() => {
            return deletionState
              ? this.setState({ deletionState: false })
              : null;
          }}
          renderIcon={() =>
            deletionState ? (
              <Icon name="md-done-all" style={styles.actionButtonIcon} />
            ) : (
              <Icon name="md-add" style={styles.actionButtonIcon} />
            )
          }
        />
      );
    }

    return (
      <ActionButton
        buttonColor={deletionState ? '#00c853' : '#f50057'}
        onPress={() => {
          return deletionState ? this.setState({ deletionState: false }) : null;
        }}
        renderIcon={() =>
          deletionState ? (
            <Icon name="md-checkmark" style={styles.actionButtonIcon} />
          ) : (
            <Icon name="md-add" style={styles.actionButtonIcon} />
          )
        }
      >
        <ActionButton.Item
          buttonColor="#9b59b6"
          title="New Deck"
          onPress={() => navigation.navigate('AddDeck')}
        >
          <Icon name="md-create" style={styles.actionButtonIcon} />
        </ActionButton.Item>
        <ActionButton.Item
          buttonColor="#e74c3c"
          title="Remove Deck"
          onPress={this.deleteDecks}
        >
          <Icon name="md-remove" style={styles.actionButtonIcon} />
        </ActionButton.Item>
      </ActionButton>
    );
  };

  render() {
    const { navigation } = this.props;
    const { deletionState } = this.state;

    return (
      <View style={styles.emptyListView}>
        <ScrollView style={{ margin: 0 }}>
          <this.EmptyListView />
          {this.renderDecks()}
        </ScrollView>
        {this.renderActionButton()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white'
  },
  badge: {
    backgroundColor: Colors.BLUE
  },
  scoreBadge: {
    backgroundColor: Colors.BLUE
  },
  cardsBadge: {
    backgroundColor: Colors.ALT_GREEN
  },
  categoryBadge: {
    backgroundColor: Colors.YELLOW
  },
  badgeText: {
    color: 'whitesmoke'
  },
  cardBadges: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  cardDeletionState: {
    borderColor: '#f50057'
  },
  emptyListView: {
    flex: 1,
    backgroundColor: '#f3f3f3'
  }
});

const mapStateToProps = state => ({
  decks: state.decks.decks
});

const mapDispatchToProps = dispatch => ({
  onDeleteDeck: deck => dispatch(deleteDeck(deck))
});

export default connect(mapStateToProps, mapDispatchToProps)(Decks);
