import { printIntrospectionSchema } from "graphql";
import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

type SquareProps = {
  value: string;
  onClick: () => void;
};

type BoardProps = { squares: string[]; onClick: (i: number) => void };

const Square = (props: SquareProps) => {
  return (
    <button className="square" onClick={() => props.onClick()}>
      {props.value}
    </button>
  );
};

const Board = (props: BoardProps) => {
  const GenerateRow = (i: number) => {
    let row = [];
    for (let n = 0; n < 3; n++) {
      const val = 3 * i + n;
      row.push(
        <Square value={props.squares[val]} onClick={() => props.onClick(val)} />
      );
    }
    return row;
  };

  const GenerateBoard = () => {
    let Board = [];
    for (let i = 0; i < 3; i++) {
      Board.push(<div className="board-row">{GenerateRow(i)}</div>);
    }
    return Board;
  };

  return <div>{GenerateBoard()}</div>;
};

const Game = () => {
  const [history, setHistory] = useState([
    {
      squares: Array<string>(9).fill(""),
      lastMove: "",
    },
  ]);
  const [xIsNext, setTurn] = useState(true);
  const [stepNumber, setStepNumber] = useState(0);
  const current = history[stepNumber];
  const winner = calculateWinner(current.squares);

  const moves = history.map((step, move: number) => {
    const desc = move ? "Go to move #" + move : "Go to game start";

    const xCoord = +step.lastMove % 3;
    const yCoord = (+step.lastMove - xCoord) / 3;

    return (
      <div className="moveList">
        {move === 0 ? null : (
          <p>
            ({xCoord},{yCoord})
          </p>
        )}
        <li key={move}>
          <button
            onClick={() => jumpTo(move)}
            style={
              stepNumber === move
                ? { backgroundColor: "#ADD8E6" }
                : { backgroundColor: "#fff" }
            }
          >
            {desc}
          </button>
        </li>
      </div>
    );
  });

  let status: string;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  const handleClick = (i: number) => {
    const gameHistory = history.slice(0, stepNumber + 1);
    const updatedSquares = [...current.squares];
    if (calculateWinner(updatedSquares) || current.squares[i]) {
      return;
    }
    updatedSquares[i] = xIsNext ? "X" : "O";
    setHistory((history) =>
      gameHistory.concat([{ squares: updatedSquares, lastMove: i.toString() }])
    );
    setStepNumber(() => gameHistory.length);
    setTurn((xIsNext) => !xIsNext);
  };

  const jumpTo = (step: number) => {
    setStepNumber(() => step);
    setTurn(() => step % 2 === 0);
  };

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={current.squares}
          onClick={(i: number) => handleClick(i)}
        />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
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
