import fs from 'fs';

const input = fs.readFileSync('./input.txt', 'utf8');

const maze = input.split('\n').map(v => v.split(''));

const n = maze.length;
const m = maze[0].length;
const dx = [0, 1, 0, -1];
const dy = [1, 0, -1, 0];
const inRange = (x, y) => {
  return x >= 0 && x < n && y >= 0 && y < m;
}

const ans = new Array(n).fill(0).map(() => new Array(m).fill(-1));
const dfs = (x, y) => {
  ans[x][y] = maze[x][y] === '9' ? 1 : 0;
  for (let i = 0; i < 4; i++) {
    const nx = x + dx[i];
    const ny = y + dy[i];
    if (!inRange(nx, ny)) {
      continue;
    }
    if (parseInt(maze[nx][ny]) - parseInt(maze[x][y]) === 1) {
      if (ans[nx][ny] === -1) {
        dfs(nx, ny);
      }
      ans[x][y] += ans[nx][ny];
    }
  }
}

let res = 0;

for (let i = 0; i < n; i++) {
  for (let j = 0; j < m; j++) {
    if (maze[i][j] === '0') {
      dfs(i, j);
      res += ans[i][j];
    }
  }
}

console.log(res)
