import fs from 'fs';

const input = fs.readFileSync('./input.txt', 'utf8');
const lines = input.trim().split('\n');

const pairData = lines
  .filter(line => line.includes('|'))
  .map(line => line.split('|').map(Number));

const arrayData = lines
  .filter(line => line.includes(','))
  .map(line => line.split(',').map(Number));

const G = new Map();

for (const [u, v] of pairData) {
  G.set(u, (G.get(u) || []).concat(v));
}

let ans = 0;
for (const list of arrayData) {
  const du = new Map();
  for (const u of list) {
    for (const v of G.get(u) || []) {
      du.set(v, (du.get(v) || 0) + 1);
    }
  }
  let flag = false;
  for (const u of list) {
    if (du.get(u) > 0) {
      flag = true;
      break;
    } else {
      for (const v of G.get(u) || []) {
        du.set(v, du.get(v) - 1);
      }
    }
  }
  if (!flag) {
    ans += list[Math.floor(list.length / 2)];
  }
}

console.log(ans);
