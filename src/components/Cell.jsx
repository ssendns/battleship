import "../assets/board.css";

export default function Cell({ x, y, cell, onClick, isDisabled }) {
  const handleClick = () => {
    if (!isDisabled) {
      onClick(x, y);
    }
  };

  let className = "cell";
  if (cell.isHit) {
    className += " hit";
  } else if (cell.isMiss) {
    className += " miss";
  }

  return (
    <div
      data-testid={`cell-${x}-${y}`}
      className={className}
      onClick={handleClick}
    ></div>
  );
}
