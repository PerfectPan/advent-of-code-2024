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

let res = 0;

for (let i = 0; i < n; i++) {
  for (let j = 0; j < m; j++) {
    if (maze[i][j] === '0') {
      const q = [];
      const vis = new Array(n).fill(0).map(() => new Array(m).fill(-1));
      q.push([i, j]);
      vis[i][j] = 0;
      let cnt = 0;
      while (q.length > 0) {
        const [x, y] = q.shift();
        if (maze[x][y] === '9') {
          cnt++;
          continue;
        }
        for (let k = 0; k < 4; k++) {
          const nx = x + dx[k];
          const ny = y + dy[k];
          if (inRange(nx, ny) && (parseInt(maze[nx][ny]) - parseInt(maze[x][y]) === 1) && vis[nx][ny] === -1) {
            vis[nx][ny] = 0;
            q.push([nx, ny]);
          }
        }
      }
      res += cnt;
    }
  }
}

console.log(res)
