import { useState } from "react";
import Square from "../Square/Square";
import "./Board.css";

const Board = () => {
  const [squares, setSquares] = useState(["", "", "", "", "", "", "", "", ""]);
  const [xIsNext, setXIsNext] = useState(true);

  function handleClick(i: number) {
    const Squares = squares.slice();
    console.log(Squares);
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    Squares[i] = xIsNext ? "X" : "O";
    setSquares(Squares);
    console.log(Squares);
    setXIsNext(!xIsNext);
  }

  function renderSquare(i: number) {
    return <Square value={String(squares[i])} onClick={() => handleClick(i)} />;
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = `winner:${winner}`;
  } else {
    status = `Next move:${xIsNext ? "X" : "O"}`;
  }

  return (
    <div>
      <div className="status">{status}</div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );

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
};

export default Board;
