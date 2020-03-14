export const generateRandomNumbers =(rows, cols)=>{
    let gameTiles = [];
    const amountOfItemsInArray = rows * cols;

    //generate unique tile numbers in random order
    while(gameTiles.length < amountOfItemsInArray){
        let tileNumber = Math.floor(Math.random() * amountOfItemsInArray);
        if(gameTiles.indexOf(tileNumber) === -1){
            gameTiles.push(tileNumber)
        };
    }
    return gameTiles;
};


export const checkIfFinished = (array) => {
    let counter;
    for(var i = 0; i < array.length - 1; i++){
        counter = i + 1;
        if(array[i] !== counter){
            return false;
        }
    }
   return true;
};

export const gridCols = (cols) => { //add styling to fit the grid
    let gridCols = '';
    for(let i = 0; i < cols; i++){
        if(i === 0){
            gridCols = gridCols.concat('auto');
        }else if(i === cols - 1){
            gridCols = gridCols.concat(' auto');
        }else{
            gridCols = gridCols.concat(' auto ');
        }
    }
    return gridCols;
}