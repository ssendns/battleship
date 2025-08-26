import Cell from "./Cell";

function Board({ boardState, onCellClick, isDisabled }) {
  const board = boardState.getBoardView();
  return (
    <div className="grid grid-cols-10 grid-rows-10 gap-[2px] w-max m-4">
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
