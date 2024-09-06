import { useState, useEffect } from "react";
import "./App.css";

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

export default function App() {
  const [player1, setPlayer1] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [moves, setMoves] = useState(0);
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    const conditionalWin = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    console.log(squares);
    for (let i = 0; i < conditionalWin.length; i++) {
      const [a, b, c] = conditionalWin[i];
      if (
        squares[a] === squares[b] &&
        squares[a] === squares[c] &&
        squares[a] != null
      ) {
        setWinner(squares[a]);
        return;
      }
    }
  }, [squares]);

  const status = winner
    ? "Winner: " + (player1 ? "O" : "X")
    : moves === 9
    ? "Draw"
    : "Next Player: " + (player1 ? "X" : "O");

  function handleClick(i) {
    if (squares[i] || winner) return;

    const nextSquares = squares.slice();
    nextSquares[i] = player1 ? "X" : "O";
    const nextHistory = history.slice(0, moves + 1);
    nextHistory.push(nextSquares);

    setHistory(nextHistory);
    setSquares(nextSquares);
    setPlayer1(!player1);
    setMoves(nextHistory.length - 1);
    //determineWinner(nextSquares);
    // console.log(player1);
    //console.log(squares);
  }

  function jumpTo(moves) {
    setSquares(history[moves]);
    setPlayer1(moves % 2 === 0);
    setMoves(moves);
    setWinner(null);
  }

  function handleNewGame() {
    setSquares(Array(9).fill(null));
    setHistory([]);
    setWinner(null);
    setMoves(0);
    setPlayer1(true);
  }

  return (
    <>
      <div>{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>

      <div>
        {history.map((_, moves) => (
          <div className="game-info" key={moves}>
            <ol>
              <button id={moves} onClick={() => jumpTo(moves)}>
                Go to move {moves}
              </button>
            </ol>
          </div>
        ))}
      </div>

      {(winner || moves === 9) && (
        <button className="game" onClick={handleNewGame}>
          New Game
        </button>
      )}
    </>
  );
}
