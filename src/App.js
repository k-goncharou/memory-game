import './App.css';
import {useEffect, useState} from "react";
import {v4 as uuidv4} from "uuid"
import Board from "./components/Board";

function App() {

    const emoji = ["🍔", "🌭", "🍏", "🚒", "🍿", "🍼"]

    const [cards, setCards] = useState(new Array(12).fill(null).map(() => ({
        id: uuidv4(),
        image: null,
        isOpen: false
    })))
    const [history, setHistory] = useState([])
    const [block, setBlock] = useState(false)
    const [winner, setWinner] = useState(false)
    const [moves, setMoves]= useState([])
    const setRandomPlace = () => {

        const newCards = cards.map((element) => ({...element, image: null, isOpen: false}))


        for (let i = 0; i < emoji.length; i++) {
            for (let time = 1; time <= 2; time++) {
                let index = Math.trunc(Math.random() * newCards.length)
                do {
                    index = Math.trunc(Math.random() * newCards.length)
                }
                while (
                    newCards[index].image !== null
                    )

                newCards[index].image = emoji[i]

            }
        }
        setCards(newCards);
    }


    useEffect(() => {
        setRandomPlace()
    }, [])

    const openCard = (id, image) => {
        const isOpen = cards.find(element=>
        element.id === id).isOpen

        if (!block && !isOpen) {
            const newCards = cards.map((element) =>
                element.id === id ? {...element, isOpen: true} : element
            )
            setCards(newCards)
            setHistory([...history, image])
            setBlock(true)
        }
    }

    const checkMove = () => {
        if (history[history.length - 2] !== history[history.length - 1]) {
            const emoji1 = history[history.length - 1]
            const emoji2 = history[history.length - 2]
            const newCards =
                cards.map((element) => element.image === emoji1 || element.image === emoji2 ? {
                    ...element,
                    isOpen: false
                } : element)
            setCards(newCards)
        }
    }
    const checkWinner = () => {
        const win = cards.every(element => element.isOpen)
        if (win === true) {setMoves([...moves, history.length / 2])}
        setWinner(win)
    }
    const restart = () => {
      setRandomPlace()
        setHistory([])
        setBlock(false)
        setWinner(false)
    }


    useEffect(() => {
        if (history.length % 2 === 0) {
            setTimeout(() => {
                checkMove()
                setBlock(false)
            }, 700)
        } else {
            setBlock(false)
        }
    }, [history])

    useEffect(() => {
        if(history.length > 12) {checkWinner()}
    }, [history])

    return (

        <div className="App">
            {history}
            <h1>MEMORY GAME</h1>
            <Board
                cards={cards}
                openCard={openCard}
            />
            {winner && <>
                <h3>
                Congratulation you won in {history.length / 2} steps
            </h3>
                <button onClick={restart}>start again</button>
            </>
            }

            <div>
                <div>
                    {moves.length > 0 &&
                        <div>
                        Moves {moves.map((element, index) => (index === moves.length- 1) ? element :  element + ', ')}
                    </div>
                    }
                </div>

            </div>

        </div>
    );
}

export default App;
