import React from 'react';
import Square from "./Square";

const Board = (props) => {
    const{cards, openCard} = props
    return (
        <div className="board">
            {cards.map(element=>
                <Square key={element.id} card={element} openCard={openCard}/>)}
        </div>
    );
};

export default Board;