import React from 'react';
import Board from './Board';
import WonGame from './WonGame';
import {generateRandomNumbers} from '../utils/Utils';

class Game extends React.Component {
    
    state = {
        gameFinished: false,
        rows: 4,
        cols: 4,
        numbersArray: []
    } 

    componentDidMount(){
        this.setState({
            numbersArray: generateRandomNumbers(this.state.rows, this.state.cols)
        });
    }                              

    gameFinished = (finished) => {
        if(finished){
            this.setState({
                gameFinished: true
            });
        }else if(!finished){
            this.setState({
                gameFinished: false
            });
        }
    }

    render(){
        return(
            <div>
                <h1>Puzzle Game Deluxe</h1>
                <p>Get the numbers in order from 1 to 15 to succeed</p>
                <Board cols={this.state.cols} gameFinished={this.gameFinished} numbersArray={this.state.numbersArray}/>
                <WonGame gameFinished={this.state.gameFinished} />
                <button onClick={ (e)=>{this.setState({numbersArray: generateRandomNumbers(this.state.rows, this.state.cols)})} }>Shuffle</button>
            </div>
        );
    }
}
export default Game;