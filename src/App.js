import './App.css'

import { useCallback, useEffect, useState } from "react"

import { wordsList } from './data/words'

// components
import StartScreen from './components/StartScreen'
import { GameOver } from './components/GameOver'
import { Game } from './components/Game'

const stages = [
  {id: 1, name: 'start'},
  {id: 2, name: 'game'},
  {id: 3, name: 'end'}
]

function App() {
  const [gameStage, setGameStage] = useState(stages[0].name)
  const [words] = useState(wordsList)

  const [pickedWord, setPickedWord] = useState("")
  const [pickedCategory, setPickedCategory] = useState("")
  const [letters, setLetters] = useState([])

  const [guessedLetters, setGuessedLetters] = useState([])
  const [wrongLetters, setWrongLetters] = useState([])
  const [guesses, setGuesses] = useState(5)
  const [score, setScore] = useState(0)

  const pickWordAndCategory = () => {
    const categories = Object.keys(words)
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)]
    const word = words[category][Math.floor(Math.random() * words[category].length)]
    const wordLetters = word.split('').map(l => l.toLowerCase())
    console.log('category', category, 'word', word)
    console.log('wordLetters', wordLetters)

    // Fill states
    setPickedCategory(category)
    setPickedWord(word)
    setLetters(wordLetters)
  }

  const startGame = () => {
    pickWordAndCategory()
    setGameStage(stages[1].name)
  }

  const verifyLetter = () => {
    setGameStage(stages[2].name)
  }

  const retry = () => {
    setGameStage(stages[0].name)
  }

  return (
    <div className="App">
     {gameStage === 'start' && <StartScreen startGame={startGame} />}
     {gameStage === 'game' && (
        <Game verifyLetter={verifyLetter}
          pickedWord={pickedWord}
          pickedCategory={pickedCategory}
          letters={letters}
          guessedLetters={guessedLetters}
          wrongLetters={wrongLetters}
          guesses={guesses}
          score={score}
        />
      )}
     {gameStage === 'end' && <GameOver retry={retry} />}
    </div>
  );
}

export default App;
