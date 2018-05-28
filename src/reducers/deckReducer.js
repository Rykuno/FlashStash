import { types } from '../actions/deckActions';

const initialState = {
  decks: []
};

const deckReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_DECK:
      return {
        ...state,
        decks: [...state.decks, action.payload]
      };
    case types.DELETE_DECK:
      return {
        ...state,
        decks: state.decks.filter(deck => deck.id !== action.payload.id)
      };
    case types.ADD_CARD:
      const { id, card } = action.payload;
      return {
        ...state,
        decks: state.decks.map(obj => {
          if (obj.id === id) {
            const newObj = obj;
            newObj.cards = [...newObj.cards, card];
            return newObj;
          }
          return obj;
        })
      };
    case types.SET_SCORE:
    console.log("SET_SCORE");
    console.log(action.payload.score);
    
      return {
        ...state,
        decks: state.decks.map(deck => {
          if (deck.id === action.payload.id) {
            const newDeck = deck;
            newDeck.previousScore = action.payload.score;
            return newDeck;
          }
          return deck;
        })
      };
    default:
      return state;
  }
};

export default deckReducer;
