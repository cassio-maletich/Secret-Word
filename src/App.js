import './App.css'

import { useEffect, useState } from 'react'

import { wordsList } from './data/words'

// components
import StartScreen from './components/StartScreen'
import { GameOver } from './components/GameOver'
import { Game } from './components/Game'

const tries = 5
const stages = [ 'start', 'game', 'end' ]

function App() {
  const [gameStage, setGameStage] = useState(stages[0])
  const [words] = useState(wordsList)

  const [pickedCategory, setPickedCategory] = useState('')
  const [letters, setLetters] = useState([])

  const [guessedLetters, setGuessedLetters] = useState([])
  const [wrongLetters, setWrongLetters] = useState([])
  const [guesses, setGuesses] = useState(tries)
  const [score, setScore] = useState(0)

  const pickWordAndCategory = () => {
    const categories = Object.keys(words)
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)]
    const word = words[category][Math.floor(Math.random() * words[category].length)]
    const wordLetters = word.split('').map(l => l.toLowerCase())
    console.log('pickedWord', category, '=>', word)
    console.log('wordLetters', wordLetters)

    // Fill states
    setPickedCategory(category)
    setLetters(wordLetters)
  }

  const startGame = () => {
    clearLetterStates()
    pickWordAndCategory()
    setGameStage(stages[1])
  }

  const verifyLetter = (l) => {
    l = l.toLowerCase()

    // check if already guessed
    if (guessedLetters.includes(l) || wrongLetters.includes(l)) {
      return
    }

    if (letters.includes(l)) {
      setGuessedLetters((actualGuessedLetters) => [ ...actualGuessedLetters, l ])
    } else {
      setGuesses((actualGuesses) => actualGuesses - 1)
      setWrongLetters((actualWrongLetters) => [ ...actualWrongLetters, l ])
    }
  }

  const clearLetterStates = () => {
    setGuessedLetters([])
    setWrongLetters([])
  }

  const retry = () => {
    setGuesses(tries)
    setScore(0)
    setGameStage(stages[0])
  }

  // monitor for game over
  useEffect(() => {
    if (guesses <= 0) {
      // game over friendo
      clearLetterStates()
      setGameStage(stages[2])
    }
  }, [guesses])

  // monitor for win condition
  useEffect(() => {
    // remove duplicated letters with 'Set'
    const uniqueLetters = [... new Set(letters)]
    if (guessedLetters.length > 0 && guessedLetters.length == uniqueLetters.length) {
      setScore((actualScore) => actualScore += 100)
      startGame()
    }
  }, [guessedLetters, letters])

  return (
    <div className='App'>
     {gameStage === 'start' && <StartScreen startGame={startGame} />}
     {gameStage === 'game' && (
        <Game verifyLetter={verifyLetter}
          pickedCategory={pickedCategory}
          letters={letters}
          guessedLetters={guessedLetters}
          wrongLetters={wrongLetters}
          guesses={guesses}
          score={score}
        />
      )}
     {gameStage === 'end' && <GameOver retry={retry} score={score} />}
    </div>
  );
}

export default App;
