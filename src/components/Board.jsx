import Cell from "./Cell";
import "../assets/board.css";

function Board({ boardState, onCellClick, isDisabled }) {
  return (
    <div className="board">
      {boardState.map((row, y) =>
        row.map((cell, x) => (
          <Cell
            key={`${x}-${y}`}
            x={x}
            y={y}
            cell={cell}
            onClick={onCellClick}
            isDisabled={isDisabled}
          />
        ))
      )}
    </div>
  );
}

export default Board;
