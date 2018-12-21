export const FETCH_CARDS = 'FETCH_CARDS'

export const getCards = () => {
  return (dispatch) => {
    fetch(`https://deckofcardsapi.com/api/deck/2892nnuhbrt3/draw/?count=5`)
      .then(res => res.json())
      .then(cards => {
        if(cards.remaining == 0){
          fetch(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`)
            .then(res => res.json())
            .then(newID => {              
              fetch(`https://deckofcardsapi.com/api/deck/`+newID.deck_id+`/draw/?count=5`)
              .then(res => res.json())
              .then(newcards => {
                dispatch({
                  type: FETCH_CARDS,
                  cards:  [...shuffleArray(newcards.cards),...shuffleArray(newcards.cards)]
                })
              })
            });
        }else{          
          dispatch({
            type: FETCH_CARDS,
            cards:  [...shuffleArray(cards.cards),...shuffleArray(cards.cards)]
          })
        }
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