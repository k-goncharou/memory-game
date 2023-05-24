import React from 'react';

const Square = (props) => {
    const {card, openCard}= props


    return (
        <button className="square" onClick={() => openCard(card.id, card.image)}>
            {card.isOpen ? card.image : null}
        </button>
    );
};

export default Square;