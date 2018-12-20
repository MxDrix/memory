export const ADD_TODO = 'SELECT_CARD'

export const selectCard = (card) => {
  return {
    type: SELECT_CARD,
    payload: card
  }
}