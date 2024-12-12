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

const vis = new Array(n).fill(0).map(() => new Array(m).fill(-1));

let cnt = 0, cnt2 = 0;

const dfs = (x, y, ch) => {
  vis[x][y] = 1;
  cnt += 1;
  cnt2 += 4;

  for (let k = 0; k < 4; k++) {
    const nx = x + dx[k];
    const ny = y + dy[k];
    if (!inRange(nx, ny)) {
      continue;
    }
    if (maze[nx][ny] === ch) {
      cnt2 -= 1;
    }
    if (vis[nx][ny] === -1 && maze[nx][ny] === ch) {
      dfs(nx, ny, ch);
    }
  }
}

let res = 0;

for (let i = 0; i < n; i++) {
  for (let j = 0; j < m; j++) if (vis[i][j] === -1) {
    cnt = cnt2 = 0;
    dfs(i, j, maze[i][j]);
    res += cnt * cnt2;
  }
}

console.log(res)
