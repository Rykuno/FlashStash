import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableWithoutFeedback
} from 'react-native';
import styled from 'styled-components';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import { Card, ListItem, Button, Badge, Avatar } from 'react-native-elements';
import { connect } from 'react-redux';
import { deleteDeck } from '../../actions/deckActions';
import * as Animatable from 'react-native-animatable';

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
    const { navigation } = this.props;
    navigation.navigate('InvidualDeck', deck);
  };

  deleteDecks = () => {
    this.setState({
      deletionState: true
    });
  };

  renderDecks = () => {
    const { decks } = this.props;
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
            containerStyle={deletionState ? styles.cardDeletionState : null}
          >
            <View style={styles.cardBadges}>
              <Badge containerStyle={styles.badge}>
                <Text>Category: {deck.category}</Text>
              </Badge>
              <Badge containerStyle={styles.badge}>
                <Text>Cards: {deck.cards.length}</Text>
              </Badge>
            </View>
          </Card>
        </Animatable.View>
      </TouchableWithoutFeedback>
    ));
  };

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
          buttonColor="#B00020"
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
      <View style={{ flex: 1, backgroundColor: '#f3f3f3' }}>
        {/* Rest of the app comes ABOVE the action button component !*/}
        <ScrollView style={{margin: 0}}>{this.renderDecks()}</ScrollView>
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
    backgroundColor: '#eeeeee'
  },
  cardBadges: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  cardDeletionState: {
    borderColor: '#f50057'
  },
  listcontainer: {
  }
});

const mapStateToProps = state => ({
  decks: state.decks.decks
});

const mapDispatchToProps = dispatch => ({
  onDeleteDeck: deck => dispatch(deleteDeck(deck))
});

export default connect(mapStateToProps, mapDispatchToProps)(Decks);
