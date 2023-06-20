import "./Square.css";

interface SquareProps {
  value: string;
  onClick: () => void;
}

const Square = ({ value, onClick }: SquareProps) => {
  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
    // 123
  );
};
export default Square;
