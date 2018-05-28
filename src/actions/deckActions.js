export const types = {
  ADD_DECK: 'ADD_DECK',
  DELETE_DECK: 'DELETE_DECK',
  ADD_CARD: 'ADD_CARD',
  SET_SCORE: 'SET_SCORE'
};

export const addDeck = deck => ({
  type: types.ADD_DECK,
  payload: deck
});

export const deleteDeck = deck => ({
  type: types.DELETE_DECK,
  payload: deck
});

export const addCard = (id, card) => ({
  type: types.ADD_CARD,
  payload: { id, card }
});

export const setScore = (id, score) => ({
  type: types.SET_SCORE,
  payload: { id, score }
});
