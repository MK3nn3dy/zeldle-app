import React from 'react';

export default function Modal({ isCorrect, turn, solution}) {

    const playAgain = () => {
        window.location.reload(false);
    }

    return (
        <div className="modal">
            {isCorrect && (
                <div>
                    <h1>You Win!</h1>
                    <p className="solution">{solution}</p>
                    <p>You found the solution in {turn} guesses!</p>
                    <p onClick={playAgain} className="play-again">Play Again</p>
                </div>
            )}

            {!isCorrect && (
                <div>
                    <h1>Never Mind!</h1>
                    <p className="solution">{solution}</p>
                    <p>Better luck next time!</p>
                    <p onClick={playAgain} className="play-again">Play Again</p>
                </div>
            )}
        </div>
    )
}