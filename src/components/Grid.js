import React from "react";
import Row from "./Row";

export default function Grid({currentGuess, guesses, turn}){

    // for debugging, comment out before build
    // console.log("The grid refreshed and the current guess is: ", currentGuess);

    return (
        <div>
            {guesses.map((g, i) => {
                if(turn === i) {
                    return <Row key={i} currentGuess={currentGuess}/>
                }
                return <Row key={i} guess={g}/>
            })}
        </div>
    )
}