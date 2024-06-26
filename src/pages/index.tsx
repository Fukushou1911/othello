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
const candidatePoint = (newBoard: number[][], turnColor: number, x: number, y: number) => {
  if (newBoard[y][x] === 0) {
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
            return true;
          } else {
            break;
          }
        }
      }
    }
  }
};
const Home = () => {
  const [turnColor, setTurnColor] = useState(1);
  const [board, setBoard] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 3, 0, 0, 0],
    [0, 0, 0, 1, 2, 3, 0, 0],
    [0, 0, 3, 2, 1, 0, 0, 0],
    [0, 0, 0, 3, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ]);
  const clickHandler = (x: number, y: number) => {
    console.log(x, y);
    const newBoard = structuredClone(board);
    if (newBoard[y][x] === 3) {
      let count = 0;
      let skipCount = 0;
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
              for (let a = 0; a < 8; a++) {
                for (let b = 0; b < 8; b++) {
                  if (newBoard[a][b] === 3) {
                    newBoard[a][b] = 0;
                  }
                  if (candidatePoint(newBoard, 3 - turnColor, b, a)) {
                    newBoard[a][b] = 3;
                    count++;
                  }
                }
              }
              break;
            } else {
              break;
            }
          }
        }
      }
      if (count !== 0) {
        setTurnColor(2 / turnColor);
      } else {
        skipCount++;
        for (let a = 0; a < 8; a++) {
          for (let b = 0; b < 8; b++) {
            if (newBoard[a][b] === 3) {
              newBoard[a][b] = 0;
            }
            if (candidatePoint(newBoard, turnColor, b, a)) {
              newBoard[a][b] = 3;
              count++;
            }
          }
        }
        if (count !== 0) {
          setTurnColor(2 / turnColor);
        } else {
          skipCount++;
        }
      }
      if (skipCount === 2) {
        setTurnColor(0)
      }
      setBoard(newBoard);
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.informationBoard}>
        <div className={styles.scoreBoard}>
          黒：{board.flat().filter((cell) => cell === 1).length}
        </div>
        <div className={styles.turnBoard}>
          {turnColor === 1 ? '黒のターン' : turnColor === 0 ?'ゲーム終了' : '白のターン'}
        </div>
        <div className={styles.scoreBoard}>
          白：{board.flat().filter((cell) => cell === 2).length}
        </div>
      </div>
      <div className={styles.board}>
        {board.map((row, y) =>
          row.map((color, x) => (
            <div className={styles.cell} key={`${x}-${y}`} onClick={() => clickHandler(x, y)}>
              {color !== 0 && color !== 3 && (
                <div
                  className={styles.stone}
                  style={{ background: color === 1 ? '#000' : '#fff' }}
                />
              )}
              {color === 3 && <div className={styles.candidate} />}
            </div>
          )),
        )}
      </div>
    </div>
  );
};

export default Home;
