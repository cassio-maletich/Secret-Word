import { useState, useRef } from 'react'
import './Game.css'

export const Game = ({ 
  verifyLetter,
  pickedWord,
  pickedCategory,
  letters,
  guessedLetters,
  wrongLetters,
  guesses,
  score
}) => {
  const [letter, setLetter] = useState('')
  const letterInputRef = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()

    verifyLetter(letter)
    setLetter('')
    letterInputRef.current.focus()
  }

  return (
    <div className='game'>
      <p>Pontuação: {score}</p>
      <h1>Advinhe a palavra</h1>
      <h3 className="tip">
        Dica sobre a palavra: <span>{pickedCategory}</span>
      </h3>

      <p>Voce ainda tem {guesses} tentativas</p>

      <div className="wordContainer">
        {letters.map((letter, i) =>
          guessedLetters.includes(letter) ? (
            <span className='letter' key={i}>
              {letter}
            </span>
          ) : (
            <span className="blankSquare" key={i}></span>
          ))}
      </div>
      <div className="letterContainer">
        <p>Tente adivinhar uma letra</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="letter"
            maxLength={1}
            required
            value={letter}
            onChange={(e) => setLetter(e.target.value)} ref={letterInputRef}
          />
          <button>Jogar</button>
        </form>
      </div>
      <div className="wrongLettersContainer">
        <p>Letras ja utilizadas</p>
        {wrongLetters.map((l, i) => <span key={i}> {l}, </span>)}
      </div>
    </div>
  )
}
