import fs from 'fs';

const input = fs.readFileSync('./input.txt', 'utf8');

const arr = input.split('').map(Number);

let ans = 0;

const list = [];

let start = 0;
let newId = 0;

for (let i = 0; i < arr.length; i += 1) {
  if (i % 2 === 0) {
    list.push({
      start,
      isUsed: false,
      isFree: false,
      value: arr[i],
      id: newId,      
    })
    newId += 1;
  } else {
    list.push({
      start,
      isUsed: false,
      isFree: true,
      value: arr[i],
      id: -1,
    })
  }

  start += arr[i];
}

for (let i = 0; i < list.length; ) {
  if (i % 2 === 0) {
    if (!list[i].isUsed) {
      list[i].isUsed = true;
      ans += Math.floor(list[i].id * (list[i].start + list[i].start + list[i].value - 1) * list[i].value / 2);
    }
    i += 1;
  } else {
    const space = list[i].value;
    let found = false;
    for (let j = list.length - 1; j >= 0; j--) {
      if (!list[j].isFree && !list[j].isUsed && list[j].value <= space) {
        list[j].isUsed = true;
        ans += Math.floor(list[j].id * (list[i].start + list[i].start + list[j].value - 1) * list[j].value / 2);
        list[i].value -= list[j].value;
        list[i].start += list[j].value;
        found = true;
        break;
      }
    }
    if (list[i].value === 0 || !found) {
      i += 1;
    }
  }
}

console.log(ans);
