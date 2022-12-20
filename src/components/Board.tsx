import Square from "./Square";

type BoardProps = {
  squares: ("X" | "O" | "")[];
  onClick: (i: number) => void;
  winningSquares: number[] | null;
};

const Board = (props: BoardProps) => {
  return (
    <div>
      {Array(3)
        .fill(null)
        .map((_, i) => (
          <div className="board-row">
            {Array(3)
              .fill(null)
              .map((_, j) => (
                <Square
                  value={props.squares[3 * i + j]}
                  onClick={() => props.onClick(3 * i + j)}
                  style={{
                    backgroundColor: props.winningSquares?.includes(3 * i + j)
                      ? "#ADD8E6"
                      : {},
                  }}
                />
              ))}
          </div>
        ))}
    </div>
  );
};

export default Board;
