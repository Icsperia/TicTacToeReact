import Square from './Square';
import {useEffect, useState} from "react";




function Board({ xIsNext, squares, onPlay }) {
    function handleClick(i) {
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        const nextSquares = squares.slice();
        nextSquares[i] = xIsNext ? 'X' : 'O';
        onPlay(nextSquares);
    }


    const winner = calculateWinner(squares);
    const status = winner ? 'Winner: ' + winner : 'Next player: ' + (xIsNext ? 'X' : 'O');


    //Sistem de scor cu resetare tabela cand avem un castigator
    const [scores, setScore] =useState({xScore: 0, oScore: 0});
    useEffect(() => {
        if (winner) {
            setScore(prev => {
                if (winner === 'O') {
                    return { ...prev, oScore: prev.oScore + 1 };
                } else {
                    return { ...prev, xScore: prev.xScore + 1 };
                }
            });
            const timeout = setTimeout(() => {
                onPlay(Array(9).fill(null));
            }, 1000);


            return () => clearTimeout(timeout);        }
    }, [winner, onPlay]);


    //Sistem de scor cu resetare tabela cand avem un castigator
    return (
        <>


            <div className="status">{status}</div>
            <div className="scores">
                <p>X Score: {scores.xScore}</p>
                <p>O Score: {scores.oScore}</p>
            </div>


            <div key = {scores} className="board-row">
                <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
                <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
                <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
            </div>
            <div className="board-row">
                <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
                <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
                <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
            </div>
            <div className="board-row">
                <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
                <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
                <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
            </div>


        </>


    );


    function calculateWinner(squares) {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let [a, b, c] of lines) {
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        return null;
    }
}


export default Board
