import { FETCH_CARDS } from '../actions/cards.actions'

let initialState = []

export default (state = initialState, action) => {
  switch(action.type) {
    case FETCH_CARDS:
      return [...state, ...action.cards]
    default:
      return state
  }
}