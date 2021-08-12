import React, { useState } from 'react';
import { calculateWinner } from '../helpers';
import Board from './Board';
import './Game.css'


export default function Game() {

    //Board layout
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [stepNumber, setStepNumber] = useState(0);
    //Winning board or not
    const [xIsNext, setXisNext] = useState(true);

    const winner = calculateWinner(history[stepNumber]);


    function handleClick(i) {
        const timeInHistory = history.slice(0, stepNumber + 1);
        const current = timeInHistory[stepNumber];
        const squares = [...current];
        //If user clicks an occupied square or if game is won, return
        if (winner || squares[i]) return;
        //Put an X or an O in the clicked square
        squares[i] = xIsNext ? 'X' : 'O';
        setHistory([...timeInHistory, squares]);
        setStepNumber(timeInHistory.length);
        setXisNext(!xIsNext);
    }

    function jumpTo(step) {
        setStepNumber(step);
        setXisNext(step % 2 === 0);

    }

    const renderMoves = () => (
        history.map((_step, move) => {
            const destination = move ? `Go to move#${move}` : `Go to start`;
            // console.log(`render is run`)
            return (
                <li key={move} className='buttonList'>
                    <button className='buttons' onClick={() => jumpTo(move)}>{destination}</button>
                </li>   
            )
        })
    )

    return (
        <>
            <Board squares={history[stepNumber]} onClick={handleClick} />
            <div className='text'>
                <p>{winner ? 'Winner: ' + winner : "Next Player: " + (xIsNext ? 'X' : 'O')}</p>
                {renderMoves()}
            </div>
        </>
    )
}
