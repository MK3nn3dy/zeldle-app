import React from 'react';

const Hint = ({hint, onClick}) => {

    return (
        <div className="hint-modal">
            <div className="hint-modal-div">
                <div onClick={onClick} className="close-hint">X</div>
                <p className="listen">Hey! Listen!</p>
                <p>{hint}</p>
            </div>
        </div>
    )
}

export default Hint;