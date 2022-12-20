import { useState } from "react";
import ReactDOM from "react-dom/client";

import Board from "./components/Board";

import "./index.css";
import getWinningSquares from "./modules/getWinningSquares";

const Game = () => {
  const [history, setHistory] = useState([
    {
      squares: Array<"X" | "O" | "">(9).fill(""),
      lastMove: "",
    },
  ]);

  const [isX, setIsX] = useState(true);
  const [stepNumber, setStepNumber] = useState(0);
  const current = history[stepNumber];

  const [reversed, setReversed] = useState(false);

  let status: string = "Next player: X";
  const winningSquares = getWinningSquares(current.squares);

  if (winningSquares) {
    let winningSquare = winningSquares[0];
    if (winningSquare) {
      const winner = current.squares[winningSquare];
      status = "Winner: " + winner;
    }
  } else if (!current.squares.includes("")) {
    status = "It is a draw";
  } else {
    status = "Next player: " + (isX ? "X" : "O");
  }

  const handleClick = (i: number) => {
    const updatedSquares = [...current.squares];
    const winningSquares = getWinningSquares(updatedSquares);

    if (winningSquares || current.squares[i]) {
      return;
    }

    updatedSquares[i] = isX ? "X" : "O";

    setHistory((prev) =>
      prev.concat([{ squares: updatedSquares, lastMove: i.toString() }])
    );

    setStepNumber(history.length);

    setIsX((isX) => !isX);
  };

  const jumpTo = (step: number) => {
    setStepNumber(step);
    setIsX(step % 2 === 0);
  };

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={current.squares}
          onClick={(i) => handleClick(i)}
          winningSquares={winningSquares}
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
          {history.map((step, move) => {
            const desc = move ? "Go to move #" + move : "Go to game start";

            const xCoord = parseInt(step.lastMove) % 3;
            const yCoord = (parseInt(step.lastMove) - xCoord) / 3;

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
          })}
        </ol>
      </div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(<Game />);
