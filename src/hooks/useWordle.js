import { useState } from "react";

const useWordle = (solution) => {

    const [turn, setTurn] = useState(0);
    const [currentGuess, setCurrentGuess] = useState('');
    const [guesses, setGuesses] = useState([...Array(6)]);
    const [history, setHistory] = useState([]);
    const [isCorrect, setIsCorrect] = useState(false);
    const [usedKeys, setUsedKeys] = useState({});

    //format guess into an array of letter objects with key and color
    const formatGuess = () => {
        let solutionArray = [...solution];
        console.log("The solution array is: ", solutionArray);
        let formattedGuess = [...currentGuess].map((l) => {
            return { key: l, color: 'grey' }
        })
        console.log("The formatted guess is: ", formattedGuess);

        // find any green letters
        formattedGuess.forEach((l, i) => {
            if(solutionArray[i] === l.key) {
                formattedGuess[i].color = 'green';
                solutionArray[i] = null    // prevents matches in yellow include method below
            }
        })

        // find any yellow letters
        formattedGuess.forEach((l, i) => {
            if(solutionArray.includes(l.key) && l.color !== 'green'){
                formattedGuess[i].color = 'yellow';
                solutionArray[solutionArray.indexOf(l.key)] = null;
            }
        })
        return formattedGuess;
    }

    // add to guess history, set state to correct if correct, add one to guesses
    const addNewGuess = (formattedGuess) => {
        if(currentGuess === solution) {
            setIsCorrect(true)
        }
        setGuesses((prevGuesses) => {
            let newGuesses = [...prevGuesses]
            newGuesses[turn] = formattedGuess;
            return newGuesses;
        })
        setHistory((prevHistory) => {
            return [...prevHistory, currentGuess]
        })
        setTurn((prevTurn) => {
            return prevTurn + 1;
        })
        setUsedKeys((prevUsedKeys) => {
            let newKeys = {...prevUsedKeys}

            formattedGuess.forEach((l) => {
                const currentColor = newKeys[l.key]

                if(l.color === 'green') {
                    newKeys[l.key] = 'green'
                    return;
                }
                if(l.color === 'yellow' && currentColor !== 'green') {
                    newKeys[l.key] = 'yellow'
                    return;
                }
                if(l.color === 'grey' && currentColor !== 'green' && currentColor !== 'yellow'){
                    newKeys[l.key] = 'grey'
                    return
                }
            })
            return newKeys;
        });
        setCurrentGuess('');
    }

    // handle key-up and track current guess
    // when enter is hit, submit guess logic
    const handleKeyup = ({ key }) => {

        if(key === 'Enter'){
            // only add guess is turn < 5
            if(turn > 5){
                console.log('You used all your guesses');
                return;
            }
            // do not allow duplicate words
            if(history.includes(currentGuess)){
                console.log('You already tried this word');
                return;
            }
            // check word is five chars long
            if(currentGuess.length !== 5){
                console.log('Your guess is not five characters long.')
                return;
            }
            const formatted = formatGuess();
            addNewGuess(formatted);
        }

        if(key === 'Backspace'){
            setCurrentGuess((prev) => {
                return prev.slice(0, -1);
            })
            return
        }

        if(/^[A-Za-z]$/.test(key)){
            if(currentGuess.length < 5){
                setCurrentGuess((prev) => {
                    return prev + key;
                })
            }
        }
    }


    // handle on-screen keypad press

    const handleKeypad = (event) => {

        const key = event.target.innerHTML;

        if(key === 'Enter'){
            // only add guess is turn < 5
            if(turn > 5){
                console.log('You used all your guesses');
                return;
            }
            // do not allow duplicate words
            if(history.includes(currentGuess)){
                console.log('You already tried this word');
                return;
            }
            // check word is five chars long
            if(currentGuess.length !== 5){
                console.log('Your guess is not five characters long.')
                return;
            }
            const formatted = formatGuess();
            addNewGuess(formatted);
        }

        if(key === 'Backspace'){
            setCurrentGuess((prev) => {
                return prev.slice(0, -1);
            })
            return
        }

        if(/^[A-Za-z]$/.test(key)){
            if(currentGuess.length < 5){
                setCurrentGuess((prev) => {
                    return prev + key;
                })
            }
        }

        console.log("The new current guess is: ", currentGuess);
    }

    return { turn, currentGuess, guesses, isCorrect, usedKeys, handleKeyup, handleKeypad };

}

export default useWordle;