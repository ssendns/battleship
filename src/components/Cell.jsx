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
  } else if (cell.hasShip) {
    className += " ship";
  }

  return (
    <div
      data-testid={`cell-${x}-${y}`}
      className={className}
      onClick={handleClick}
      style={{
        gridRow: y + 1,
        gridColumn: x + 1,
      }}
    ></div>
  );
}
