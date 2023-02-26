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
  const [bestScore, setBestScore] = useState(JSON.parse(localStorage.getItem('bestScore')))

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
          if (rollCount < bestScore || bestScore === 0){
            setBestScore(rollCount)
            localStorage.setItem('bestScore', JSON.stringify(rollCount))
          }
          else{
            setBestScore(bestScore)
          }
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
     value: Math.floor(Math.random() * 20),
     id: nanoid(),
     isHeld: false
    } 
  } 

  //generate 3x9 card array. 
   function generateCardArray(){
    //show best score by getting it from local storage by parsing it
    
    const cardArray = []
    for (let i = 0; i < 27; i++){
        cardArray.push(generateNumber())
    }
    return cardArray
  }

   function resetCardArray(){
    setCardArray(generateCardArray())
    setRollCount(0)
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
    setBingoNumber(Math.floor(Math.random() * 20))
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

  //when generateBingoNumber is clicked, rollCount increases by 1
  const [rollCount, setRollCount] = useState(0)
  useEffect(() => {
    
    if (bingoNumber !== 0){
      if (cardArray.some(card => card.value === bingoNumber && card.isHeld === false)){
        rollCount
      }
      else{
        setRollCount(rollCount + 1) 
      }
    }
  }, [bingoNumber])
  
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
          <h2 className='roll-count'>Roll Count: {rollCount} Best Score: {bestScore}</h2>
        </div>
        <div>
          <h2 className='row-state'>{rowState}</h2>
        </div>
        
        <div>
          <button className='button' onClick={generateBingoNumber}>Generate Bingo Number</button>
          
        </div>
        <div>
        <button className='button' onClick={resetCardArray}>New Game</button>
        </div>
        <div>
          <h2 className='bingo-number'>Bingo Number: {bingoNumber}</h2>
        </div>
    </main>
  )
}

export default App
