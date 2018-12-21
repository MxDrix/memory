import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getCards } from './actions/cards.actions';
import './index.css';

class Memory extends Component {
  constructor(props) {
      super(props);
      this.state = {
        isSelected: [],
        isFound: [],
        win: 0
      };
      this.toggleClass= this.toggleClass.bind(this);
  }
  componentDidMount() {
    this.props.getCards()
  }
  toggleClass = (e) => {
    if(this.state.isSelected.length <= 1){
      if(e.target.classList.contains('Selected')){
      }else{
        if(e.target.classList.contains('found')){
          console.log("Already found")
        }else{
          e.target.classList.toggle('Selected');
          let value = e.target.getAttribute("data-code");
          let id = e.target.getAttribute("id");
          this.state.isSelected.push({"value":value,"id": id});
          this.setState({ isSelected:  this.state.isSelected })
          if(this.state.isSelected[1]){
            if(this.state.isSelected[0].value === this.state.isSelected[1].value){
              console.log("found !");
              this.state.isFound.push(value);
              this.setState({ isFound:  this.state.isFound });
              document.getElementById(this.state.isSelected[0].id).className = "found";
              document.getElementById(this.state.isSelected[1].id).className = "found";
              this.setState({ isSelected:  [] });  
              if(this.state.isFound.length === 4){
                console.log("Winn");
                this.setState({ win:  this.state.win + 1 });
              }
            }else{
              console.log("not found");
              if(this.state.isSelected[1]){
                document.getElementById(this.state.isSelected[0].id).className = "";
                document.getElementById(this.state.isSelected[1].id).className = "";
                this.setState({ isSelected:  [] });  
              }
            }
          }
        }
      }
    }
  }
  render() {
    let cardsListe = this.props.cards.map((card, index) => 
      <li key={card.code} onClick={this.toggleClass} id={index} data-code={card.code}>
        <img className="cardFace" alt={card.suit+' - '+card.value} src={card.images.png}/>
        <img className="cardBack" alt="back of a card" src="/images/dos.png"/> 
        </li>)
    return (
      <div className="App">
        <div className="historique">
          Victoire : {this.state.win}
        </div>
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
