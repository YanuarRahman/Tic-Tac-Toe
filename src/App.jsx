import { useState } from 'react'

// component
function Squere({value, onSquereClick}){

  return (
    <button className='squere' onClick={onSquereClick}>
      {value}
    </button>
  ); 
}


function Board({xIsNext, squeres, onPlay}) {

  function handleClick(i){
    // jika sudah ada isi apa jangan dijalankan sintax yang bawah
    if (squeres[i] || calculateWin(squeres)) return;

    const nextSqueres = squeres.slice();

    // kondisi untuk ganti parameter
    // if(xIsNext){
    //   nextSqueres[i] = 'X';
    // }else{
    //   nextSqueres[i] = 'O';
    // }
    // ternary 
    nextSqueres[i] = xIsNext ? 'X' : 'O';

    onPlay(nextSqueres)
  }

  const winner = calculateWin(squeres);
  let status = '';
  // if(winner){
  //   status = 'Winner : ' + winner;
  // }else {
  //   status = 'Next Player: ' + (xIsNext ? 'X' : 'Y')
  // }
  // ternary
  status = winner ? 'Winner : ' + winner :  'Next Player: ' + (xIsNext ? 'X' : 'O')


  return (
    <>
      <div className='status'>{status}</div>
      <div className='board'>
        {/* manggil component */}
        {/* dimasukan ke arrow functuion karna agar tidak langsugg methode handleclicknya berjalan */}
        <Squere value={squeres[0]} onSquereClick={()=> handleClick(0)}/>
        <Squere value={squeres[1]} onSquereClick={()=> handleClick(1)}/>
        <Squere value={squeres[2]} onSquereClick={()=> handleClick(2)}/>
        <Squere value={squeres[3]} onSquereClick={()=> handleClick(3)}/>
        <Squere value={squeres[4]} onSquereClick={()=> handleClick(4)}/>
        <Squere value={squeres[5]} onSquereClick={()=> handleClick(5)}/>
        <Squere value={squeres[6]} onSquereClick={()=> handleClick(6)}/>
        <Squere value={squeres[7]} onSquereClick={()=> handleClick(7)}/>
        <Squere value={squeres[8]} onSquereClick={()=> handleClick(8)}/>
      </div>
    </>
  );
}



function Game(){
  const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);  
  // const xIsNext = currentMove % 2 === 0;
  const currentSqueres = history[currentMove];

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
    setXIsNext(nextMove % 2 === 0);

  }
  function handlePlay(nextSqueres){
    const nextHistory = [...history.slice(0, currentMove + 1), nextSqueres];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    setXIsNext(!xIsNext);
  
  }
const moves = history.map((squeres, move) => {
  let description = '';
  if(move > 0){
    description = 'Go To Move :' + move;
  }else{
    description = 'Go To Game Start';
  }

  return (
    <li key= {move}>
        <button onClick={()=> jumpTo(move)}>{description}</button>
    </li>
  );
});


  return (
    <div className='game'>
      <div className='game-board'>
        <Board xIsNext = {xIsNext} squeres = {currentSqueres} onPlay= {handlePlay} />
      </div>

      <div className='game-info'>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}


export default Game


// rules win
function calculateWin(squeres){
  const lines = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
  ];

  for (let i = 0 ; i < lines.length; i++ ){
    const [a, b, c] = lines[i];

    if(squeres[a] && squeres[a] === squeres [b] && squeres[a] === squeres [c]){
      return squeres[a];
    }
  }
}