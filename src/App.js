import palavras from './palavras';
import Jogo from './Jogo';
import Letras from './Letras';
import { useState } from 'react';
import forca0 from './assets/forca0.png'
import forca1 from './assets/forca1.png'
import forca2 from './assets/forca2.png'
import forca3 from './assets/forca3.png'
import forca4 from './assets/forca4.png'
import forca5 from './assets/forca5.png'
import forca6 from './assets/forca6.png'

function App() {
  const [errors, setErrors] = useState(0);
  const [disabledStart, setDisabledStart] = useState(false);
  const [drawnWord, setDrawnWord] = useState([]);
  const [image, setImage] = useState([forca0, forca1, forca2, forca3, forca4, forca5, forca6]);
  const [winCondition, setWincondition] = useState('');
  const [tries, setTries] = useState([]);
  const [reset, setReset] = useState(false)
  const [shownWord, setShownWord] = useState([]);

  console.log('palavra sorteada: ', drawnWord);
  console.log('erros: ', errors);

  const startGame = () => {
    const randomWord = palavras[Math.floor(Math.random() * palavras.length)];
    setDrawnWord(randomWord.split(""));
    setShownWord(Array(randomWord.length).fill('_'));
    setDisabledStart(true);
  }

  function resetGame() {
    if (reset) {
      setReset(false);
      setErrors(0);
      setImage([forca0,forca1,forca2,forca3,forca4,forca5,forca6]);
      setShownWord([]);
      setDrawnWord([]);
      setTries([]);
      setDisabledStart(false);
      setWincondition("");
    }
    startGame();
  }

  function endGame(summedErrors) {
    if(summedErrors > 5){
      setWincondition("perdedor");
      setShownWord(drawnWord);
      setDisabledStart(false);
      setReset(true);
    }
    else if(!shownWord.includes("_")) {
      setWincondition("vencedor");
      setDisabledStart(false);
      setReset(true);
    }
  }

  function clickLetter(letter) {
    setTries([...tries, letter]);
    for(let i = 0; i < drawnWord.length; i++) {
      if(drawnWord[i].includes(letter)){
        shownWord.splice(i, 1, drawnWord[i])
        endGame();
      }
    }
  }

  return (
    <div className='app'>
      <Jogo resetGame={resetGame}
      disabledStart={disabledStart}
      shownWord={shownWord}
      image={image[errors]}
      winCondition={winCondition}
      />
      <Letras
        disabledStart={disabledStart}
        clickLetter={clickLetter}
        tries={tries}
      />
    </div>
  )
}

export default App;