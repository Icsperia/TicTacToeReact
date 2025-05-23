import {useState} from "react";
import Board from "./Board";


function Game(){
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);
    const xIsNext = currentMove % 2 === 0;
    const currentSquare = history[currentMove];




    function handleplay(nextSquares){
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
    }








    function jumpTo(nextMove){
        setCurrentMove(nextMove);
    }
    let moves = history.map((squares, move) => {
        let description;
        if(move > 0){
            description ='Go to move #' + move
        }else {
            description = 'Go to game start';


        }
        return (
            <li key={move}>
                <button onClick={()=> jumpTo(move)}>{description}</button>
            </li>
        )
    })
    return(
        <div className="game">
            <div className="game-board">
                <Board xIsNext={xIsNext} squares={currentSquare} onPlay={handleplay}></Board>
            </div>
            <div className="game-info">
                <ol>{moves}</ol>
            </div>
        </div>
    )


}


export default Game
