export default function Jogo({ resetGame, disabledStart,winCondition, image, shownWord}) {
  return (
    <div className="jogo">
      <img data-test="game-image" className="forca" src={image} alt="forca" />
      <button data-test="choose-word" className="escolherPalavra" disabled={disabledStart} onClick={() => resetGame()} >Escolher Palavra</button>
      <div data-test="word" className={`palavra ${winCondition}`} >
        {shownWord.join(" ")}
      </div>
    </div>
  );
}