import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getCards } from './actions/cards.actions';
import './index.css';

class Memory extends Component {
  componentDidMount() {
    this.props.getCards()
  }

  handleClick = (event) => {
    event.preventDefault()
  }

  render() {
    let cardsListe = this.props.cards.map(card => 
      <li className="No_selected" key={card.code} data-code={card.code}><img src={card.images.png}/></li>)
    return (
      <div className="App">
        <ul>{cardsListe}</ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    cards: state.cards
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getCards: bindActionCreators(getCards, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Memory);
