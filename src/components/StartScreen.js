import './StartScreen.css'

const StartScreen = ({ startGame }) => {
  return <div className='start'>
    <h1>Secret Word</h1>
    <p>Click no botão abaixo pra começar</p>
    <button onClick={startGame}>Começar o jogo</button>
  </div>
}

export default StartScreen
