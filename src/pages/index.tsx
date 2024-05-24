import { useState } from 'react';
import styles from './index.module.css';

const directions = [
  [1, 0],
  [1, 1],
  [1, -1],
  [0, 1],
  [0, -1],
  [-1, 0],
  [-1, 1],
  [-1, -1],
];
const Home = () => {
  const [turnColor, setTurnColor] = useState(1);
  const [board, setBoard] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 2, 0, 0, 0],
    [0, 0, 0, 2, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ]);
  const clickHandler = (x: number, y: number) => {
    console.log(x, y);

    const newBoard = structuredClone(board);
    for (const direction of directions) {
      if (
        newBoard[y + direction[0]] !== undefined &&
        newBoard[y + direction[0]][x + direction[1]] === 3 - turnColor
      ) {
        for (let i = 1; i < 9; i++) {
          if (
            newBoard[y + direction[0] * i] !== undefined &&
            newBoard[y + direction[0] * i][x + direction[1] * i] === 3 - turnColor
          ) {
            continue;
          } else if (
            newBoard[y + direction[0] * i] !== undefined &&
            newBoard[y + direction[0] * i][x + direction[1] * i] === turnColor
          ) {
            for (let s = 1; s < i; s++) {
              newBoard[y + direction[0] * s][x + direction[1] * s] = turnColor;
            }
            newBoard[y][x] = turnColor;
            setTurnColor(2 / turnColor);
            setBoard(newBoard);
            break;
          } else {
            break;
          }
        }
        // newBoard[y][x] = turnColor;
        // setTurnColor(2 / turnColor);

        // setBoard(newBoard);
      }
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.informationBoard}>
        <div className={styles.scoreBoard}>{board.flat().filter((cell) => cell === 1).length}</div>
        <div className={styles.turnBoard} />
        <div className={styles.scoreBoard}>{board.flat().filter((cell) => cell === 2).length}</div>
      </div>
      <div className={styles.board}>
        {board.map((row, y) =>
          row.map((color, x) => (
            <div className={styles.cell} key={`${x}-${y}`} onClick={() => clickHandler(x, y)}>
              {color !== 0 && (
                <div
                  className={styles.stone}
                  style={{ background: color === 1 ? '#000' : '#fff' }}
                />
              )}
            </div>
          )),
        )}
      </div>
    </div>
  );
};

export default Home;
