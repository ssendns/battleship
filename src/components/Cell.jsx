export default function Cell({
  x,
  y,
  cell,
  onClick,
  isDisabled,
  isPlayerBoard,
}) {
  const handleClick = () => {
    if (!isDisabled) {
      onClick(x, y);
    }
  };

  let className =
    "w-8 h-8 border border-gray-300 transition-colors duration-200";

  if (cell.isHit) {
    className += " bg-red-500";
  } else if (cell.isMiss) {
    className += " bg-white";
  } else if (cell.hasShip && isPlayerBoard) {
    className += " bg-blue-900";
  } else {
    className += " bg-blue-200 hover:bg-blue-300 cursor-pointer";
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
