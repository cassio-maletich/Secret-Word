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
        <form>
          <input type="text" name="letter" maxLength={1} required />
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
