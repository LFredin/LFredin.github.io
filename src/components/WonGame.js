import React from 'react';

const WonGame = (props) => {

    if(props.gameFinished){
        return(
            <div>
                <h4>Congratulations! You did it!</h4>
            </div>
        );
    }else{
        return(
            <div></div>
        );
    }
}

export default WonGame;