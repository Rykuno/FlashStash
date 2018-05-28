import { createStackNavigator } from 'react-navigation';
import Decks from '../components/Decks';
import AddDeck from '../components/AddDeck';
import IndividualDeck from '../components/IndividualDeck';
import AddCard from '../components/AddCard';
import Quiz from '../components/Quiz';

const Navigator = createStackNavigator({
  Decks: {
    screen: Decks,
    navigationOptions: {
      title: 'Decks'
    }
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      title: 'Add Deck'
    }
  },
  IndividualDeck: {
    screen: IndividualDeck,
    navigationOptions: {
      title: "Deck"
    }
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: {
      title: "Add Card"
    }
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      title: "Quiz"
    }
  }
});

export default Navigator;
