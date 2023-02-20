import { useState } from 'react'
import {useEffect} from 'react'
import './App.css'
import Card from './Card'
import {nanoid} from 'nanoid'

function App() {

  const [cardArray, setCardArray] = useState(generateCardArray())
  const [bingoNumber, setBingoNumber] = useState(0)
  const [randomElement, setRandomElement] = useState(0)

  function generateNumber() {
    return{
     value: Math.floor(Math.random() * 90+1),
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
    setBingoNumber(Math.floor(Math.random() * 99))
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
      <h1 className='title'>
       Welcome to the Bingo Game!
      </h1>
        <div className='card-array' onClick={handleClick}>
            {cardElements}
        </div>
        
        <div>
          <button className='button' onClick={generateBingoNumber}>Generate Bingo Number</button>
          
        </div>
        <div>
          <h2 className='bingo-number'>Bingo Number: {bingoNumber}</h2>
        </div>
    </main>
    
   
  )
}

export default App
