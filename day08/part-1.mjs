import fs from 'fs';

const input = fs.readFileSync('./input.txt', 'utf8');

const lines = input.trim().split('\n').map(line => line.split(''));

const n = lines.length;
const m = lines[0].length;

const newLines = new Array(n).fill(0).map(() => new Array(m).fill('.'));

const map = new Map();

for (let i = 0; i < n; i++) {
  for (let j = 0; j < m; j++) {
    if (lines[i][j] !== '.' && lines[i][j] !== '#') {
      map.set(lines[i][j], [...(map.get(lines[i][j]) || []), [i, j]]);
    }
  }
}

let count = 0;

for (const [_, value] of map.entries()) {
  for (let i = 0; i < value.length; i++) {
    for (let j = i + 1; j < value.length; j++) {
      const [x1, y1] = value[i];
      const [x2, y2] = value[j];
      const dx = x2 - x1;
      const dy = y2 - y1;
      const x3 = x1 - dx;
      const y3 = y1 - dy;
      const x4 = x2 + dx;
      const y4 = y2 + dy;
      if (x3 >= 0 && x3 < n && y3 >= 0 && y3 < m) {
        if (newLines[x3][y3] === '.') {
          newLines[x3][y3] = '#';
          count++;
        }
      }
      if (x4 >= 0 && x4 < n && y4 >= 0 && y4 < m) {
        if (newLines[x4][y4] === '.') {
          newLines[x4][y4] = '#';
          count++;
        }
      }
    }
  }
}

fs.writeFileSync('./output.txt', `${count}`);
