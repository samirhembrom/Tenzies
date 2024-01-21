import React from 'react'
import Die from './Die.jsx'
import Confetti from 'react-confetti'

export default function App(){

    const [ allDice, setAllDice ] = React.useState(allNewDice());
    const [ tenzies, setTenzies ] = React.useState(false);

    React.useEffect( ()=> { 
            let isHeld = allDice.every( die => die.isHeld )
            let firstValue = allDice[0].value
            let allSameValue = allDice.every( die => firstValue === die.value )
            if ( isHeld && allSameValue ) {
                setTenzies(true)
            }
        }, 
        [allDice] 
    )

    function allNewDice() {
        const newDice = []
        for ( let i = 0; i < 10; ++i ) 
            newDice.push(
                {
                    value: Math.ceil(Math.random()*6), 
                    isHeld: false,
                    id: i+1
                })
        return newDice
    }

    function holdDice(id){
        setAllDice( (prevState) => prevState.map( die => {
            return die.id === id  ? { ...die, isHeld : !die.isHeld}
            : die;
        }))
    }

    const diceElements = allDice.map( 
        die => (<Die 
            key={die.id} 
            isHeld={die.isHeld} 
            value={die.value}
            holdDice={() => holdDice(die.id)}
            />) )
    
    function rollDice() {
        if( !tenzies ){
            setAllDice( oldDice => oldDice.map( die => {
                return die.isHeld ? {...die} :
                { ...die,
                value: Math.ceil(Math.random()*6)
                }
            }))
        }else {
            setTenzies(false);
            setAllDice(allNewDice());
        }
    }

    return (
        <>
            <main>
                {tenzies && <Confetti/>}
                <h1 className='title'>Tenzies</h1>
                <p className='instruction'>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
                <div className='container'>
                    {diceElements}
                </div>
                <button className='roll-dice' onClick={rollDice}>{tenzies ? `New Game` : `Roll` }</button>
            </main>
        </>
    )
}