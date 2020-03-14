import React from 'react';
import {checkIfFinished, gridCols} from '../utils/Utils';
import {Flipper, Flipped} from 'react-flip-toolkit';

class Board extends React.Component {
    
     state = {
        gameTiles: [],
        selectedTile: '',
        initialArray: [],
        shuffle: false
    }
    
    generateBoard = () => {
        let tiles = this.state.gameTiles;
        const displayTiles = tiles.map((tileNumber)=>
            <Flipped key={tileNumber} flipId={tileNumber}>
                <div id={'Tile'+tileNumber} className="gameTile" onClick={this.handleTileSelection}>
                    <p>{tileNumber}</p> 
                </div>
            </Flipped>
        );
        return(
            displayTiles
        );
    }

    handleTileSelection = (e) => { 
        var tileNum = e.target.textContent;
        if(tileNum !== '0'){
            this.setState({
                selectedTile: tileNum
            }, ()=>{
                this.moveTile();
            });
        }
    }

    moveTile = () => {
        let num = parseInt(this.state.selectedTile, 10);
        let tilesArr = this.state.gameTiles;
        let index = tilesArr.indexOf(num);
        let indexOfZero = tilesArr.indexOf(0);
        let cols = this.props.cols;

        if(index !== -1 && (index - 1 === indexOfZero || index + 1 === indexOfZero ||index + cols === indexOfZero || index - cols === indexOfZero )) {
            const arrayCopy = tilesArr.slice();
            arrayCopy.splice(index, 1, arrayCopy.splice(indexOfZero, 1, arrayCopy[index])[0]); //insert "empty tile" into the place where the selectedTile was
            
            this.setState({
                gameTiles: arrayCopy,
                shuffle: !this.state.shuffle
            },()=>{
                this.setFinished();
            }); 
        } 
    }

    setFinished = () => {
        let finishedGame = checkIfFinished(this.state.gameTiles);
        this.setState({
            finishedGame: finishedGame
        });
        this.props.gameFinished(finishedGame);
    }

    componentDidMount(){
        let numbersArray = this.props.numbersArray;
        this.setState({
            gameTiles: numbersArray,
            initialArray: numbersArray
        });
    }

    static getDerivedStateFromProps(nextProps, prevState){
         if(nextProps.numbersArray !== prevState.initialArray){
            return{
                initialArray: nextProps.numbersArray,
                gameTiles: nextProps.numbersArray,
                shuffle: !prevState.shuffle  //toggle shuffle at user btn press
            };
        } else{
            return null;
        }
    }

    render(){
        return(
            <div>
                <Flipper flipKey={this.state.shuffle}>
                    <div className="gameBoardContainer" style={{gridTemplateColumns:gridCols(this.props.cols)}}>
                        {this.generateBoard()}
                    </div>
                </Flipper>
            </div>
        );
    }
}

export default Board;