export const FETCH_CARDS = 'FETCH_CARDS'

export const getCards = () => {
  return (dispatch) => {
    fetch(`https://deckofcardsapi.com/api/deck/1ya5s4og3tmd/draw/?count=5`)
      .then(res => res.json())
      .then(cards => {
        dispatch({
          type: FETCH_CARDS,
          cards:  [...shuffleArray(cards.cards),...shuffleArray(cards.cards)]
        })
      })
  }
}
const shuffleArray = (d) =>{
    for (var c = d.length - 1; c > 0; c--) {
        var b = Math.floor(Math.random() * (c + 1));
        var a = d[c];
        d[c] = d[b];
        d[b] = a;
    }
    return d
};