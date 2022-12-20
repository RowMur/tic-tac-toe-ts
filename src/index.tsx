import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

type SquareProps = {
  value: string;
  onClick: () => void;
  style: { backgroundColor: any };
};

type BoardProps = {
  squares: string[];
  onClick: (i: number) => void;
  winningSquares: number[] | null;
};

const Square = (props: SquareProps) => {
  return (
    <button
      className="square"
      onClick={() => props.onClick()}
      style={props.style}
    >
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
        <Square
          value={props.squares[val]}
          onClick={() => props.onClick(val)}
          style={{
            backgroundColor: props.winningSquares?.includes(val)
              ? "#ADD8E6"
              : {},
          }}
        />
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

  const [reversed, setReversed] = useState(false);

  const moves = history.map((step, move: number) => {
    const desc = move ? "Go to move #" + move : "Go to game start";

    const xCoord = +step.lastMove % 3;
    const yCoord = (+step.lastMove - xCoord) / 3;

    return (
      <div className="moveList">
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
        {move === 0 ? null : (
          <p>
            ({xCoord},{yCoord})
          </p>
        )}
      </div>
    );
  });
  let status: string = "Next player: X";
  const winning = calculateWinner(current.squares);
  if (winning) {
    let winSquare = winning?.[0];
    if (winSquare) {
      const winner = current.squares[winSquare];
      status = "Winner: " + winner;
    }
  } else if (!current.squares.includes("")) {
    status = "It is a draw";
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  const handleClick = (i: number) => {
    const gameHistory = history.slice(0, stepNumber + 1);
    const updatedSquares = [...current.squares];
    const winnings = calculateWinner(updatedSquares);
    if (winnings || current.squares[i]) {
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
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return [a, b, c];
      }
    }
    return null;
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={current.squares}
          onClick={(i: number) => handleClick(i)}
          winningSquares={winning}
        />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <button onClick={() => setReversed((reversed) => !reversed)}>
          Order Moves: {reversed ? "Descending" : "Ascending"}
        </button>
        <ol
          style={{
            display: "flex",
            flexDirection: reversed ? "column-reverse" : "column",
          }}
        >
          {moves}
        </ol>
      </div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(<Game />);
