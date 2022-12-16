import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

type SquareProps = {
  value: string;
  onClick: () => void;
};

const Square = (props: SquareProps) => {
  return (
    <button className="square" onClick={() => props.onClick()}>
      {props.value}
    </button>
  );
};

const Board = () => {
  const [xIsNext, setTurn] = useState(true);
  const [squares, setSquares] = useState(Array<string>(9).fill(""));
  const winner = calculateWinner(squares);
  let status: string;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  const handleClick = (i: number) => {
    const updatedSquares = [...squares];
    if (calculateWinner(updatedSquares) || squares[i]) {
      return;
    }
    updatedSquares[i] = xIsNext ? "X" : "O";
    setSquares((squares) => updatedSquares);
    setTurn((xIsNext) => !xIsNext);
  };

  return (
    <div>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onClick={() => handleClick(0)} />
        <Square value={squares[1]} onClick={() => handleClick(1)} />
        <Square value={squares[2]} onClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onClick={() => handleClick(3)} />
        <Square value={squares[4]} onClick={() => handleClick(4)} />
        <Square value={squares[5]} onClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onClick={() => handleClick(6)} />
        <Square value={squares[7]} onClick={() => handleClick(7)} />
        <Square value={squares[8]} onClick={() => handleClick(8)} />
      </div>
    </div>
  );
};

const Game = () => {
  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
      <div className="game-info">{/*  status */}</div>
    </div>
  );
};

function calculateWinner(squares: string[]) {
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
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(<Game />);
