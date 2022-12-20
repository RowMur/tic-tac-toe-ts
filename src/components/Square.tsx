type SquareProps = {
  value: "X" | "O" | "";
  onClick: () => void;
  style: { backgroundColor: any };
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

export default Square;
