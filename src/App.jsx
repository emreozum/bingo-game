import { useState } from 'react'
import {useEffect} from 'react'
import './App.css'
import Card from './Card'
import {nanoid} from 'nanoid'
import Confetti from 'react-confetti'

function App() {
  const [cardArray, setCardArray] = useState(generateCardArray())
  const [bingoNumber, setBingoNumber] = useState(0)
  const [rowState, setRowState] = useState('')

   function CheckRowState() {
    const row1 = cardArray.slice(0, 9)
    const row2 = cardArray.slice(9, 18)
    const row3 = cardArray.slice(18, 27)

    const row1Held = row1.every(card => card.isHeld)
    const row2Held = row2.every(card => card.isHeld)
    const row3Held = row3.every(card => card.isHeld)

    if (row1Held || row2Held || row3Held){
      setRowState('One Row!')
      if (row1Held && row2Held || row1Held && row3Held || row2Held && row3Held){
        setRowState('Two Rows!')
        if (row1Held && row2Held && row3Held){
          setRowState('Bingo!')
          return <Confetti />
        }
      }
    }
    else{
      setRowState('Keep Going!')
    }
  }

   function generateNumber() {
    return{
     value: Math.floor(Math.random() * 90),
     id: nanoid(),
     isHeld: false
    } 
  } 

  //generate 3x9 card array. 
   function generateCardArray(){
    const cardArray = []
    for (let i = 0; i < 27; i++){
        cardArray.push(generateNumber())
    }
    return cardArray
  }

   function resetCardArray(){
    setCardArray(generateCardArray())
  }

   function handleClick(id){
    setCardArray(oldCardArray => oldCardArray.map(card => {
      if (card.id === id) {
        return {
          ...card,
          isHeld: !card.isHeld
        }
      }
      return card
    }
    ))
  }

   function generateBingoNumber(){
    setBingoNumber(Math.floor(Math.random() * 90))
    setCardArray(oldCardArray => oldCardArray.map(card => {
      if (card.value === bingoNumber) {
        return {
          ...card,
          isHeld: true 
        }
      }

      return card
    }))
  }

  const cardElements = cardArray.map(card => {
    return <Card
     key={card.id} 
     value={card.value} 
     isHeld={card.isHeld} 
     holdCard={() => handleClick(card.id)}
     />
  })

  return (
    <main>
      <CheckRowState />
      <h1 className='title'>
       Welcome to the Bingo Game!
      </h1>
        <div className='card-array' onClick={handleClick}>
            {cardElements}
        </div>
        <div>
          <h2 className='row-state'>{rowState}</h2>
        </div>
        
        <div>
          <button className='button' onClick={generateBingoNumber}>Generate Bingo Number</button>
          
        </div>
        <div>
        <button className='button' onClick={resetCardArray}>Reset Card</button>
        </div>
        <div>
          <h2 className='bingo-number'>Bingo Number: {bingoNumber}</h2>
        </div>
    </main>
  )
}

export default App
