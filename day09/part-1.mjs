import fs from 'fs';

const input = fs.readFileSync('./input.txt', 'utf8');

const arr = input.split('').map(Number);

let ans = 0, sum = 0;
let id = 0;

let lastId = Math.floor(arr.length / 2.0);
let lastIdx = arr.length % 2 === 0 ? arr.length - 2 : arr.length - 1;

for (let i = 0, j = lastIdx; i < arr.length && j >= 0 && i <= j;) {
  if (i % 2 === 1) {
    const consume = Math.min(arr[i], arr[j]);
    ans += Math.floor(lastId * (sum + sum + consume - 1) * consume / 2);
    arr[i] -= consume;
    arr[j] -= consume;
    if (arr[i] === 0) {
      i++;
    }
    if (arr[j] === 0) {
      j -= 2;
      lastId -= 1;
    }
    sum += consume;
  } else {
    // sum * id + (sum + 1) * id + ... + (sum + arr[i] - 1) * id
    // id * (sum + sum + arr[i] - 1) * arr[i] / 2
    ans += Math.floor(id * (sum + sum + arr[i] - 1) * arr[i] / 2);
    id += 1;
    sum += arr[i];
    i++;
  }

}

console.log(ans);
