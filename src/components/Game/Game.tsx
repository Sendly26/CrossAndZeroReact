import Board from "../Board/Board";
import { useState } from "react";
import "./Game.css";

const Game = () => {
  const [history, setHistory] = useState([{}]);
  const [squares, setSquares] = useState(["", "", "", "", "", "", "", "", ""]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);

  function handleClick(i: number) {
    const History = history.slice(0, stepNumber + 1);
    // const current = history[stepNumber];
    const Squares = squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    Squares[i] = xIsNext ? "X" : "O";
    setSquares(Squares);
    setHistory(
      History.concat([
        {
          Squares,
        },
      ])
    );
    setStepNumber(History.length);
    setXIsNext(!xIsNext);
  }

  function jumpTo(step) {
    ({
      setStepNumber: step,
      setXIsNext: step % 2 === 0,
    });
  }

  const moves = history.map((step, move) => {
    const desc = move ? `Перейти к ходу #${move}` : "К началу игры";
    function jumpTo(move: number): void {
      throw new Error("Function not implemented.");
    }

    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    );
  });

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = `winner:${winner}`;
  } else {
    status = `Next move:${xIsNext ? "X" : "O"}`;
  }

  function calculateWinner(squares: string[]) {
    // TODO добавить просчет ничей
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i += 1) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board squaresValues={squares} onClick={handleClick} />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
};

export default Game;
