import Cell from "./Cell";
import "../assets/board.css";

function Board({ boardState, onCellClick, isDisabled }) {
  const board = boardState.getBoardView();
  return (
    <div className="board">
      {board.map((row, y) =>
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
