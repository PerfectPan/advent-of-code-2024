import fs from 'fs';

const input = fs.readFileSync('./input.txt', 'utf8');

const network = input.split('\n').map((v) => v.split('-'));

const nodes = new Set();
const graph = new Map();

for (const [u, v] of network) {
  nodes.add(u);
  nodes.add(v);
  if (!graph.has(u)) {
    graph.set(u, []);
  }
  graph.get(u).push(v);
  if (!graph.has(v)) {
    graph.set(v, []);
  }
  graph.get(v).push(u);
}

let ans = 0;
for (const node of nodes) {
  const list = graph.get(node);
  for (let i = 0; i < list.length; i++) {
    for (let j = i + 1; j < list.length; j++) {
      if (graph.get(list[i]).includes(list[j])) {
        ans += 1;
      }
    }
  }
}

let res = 0;
for (const node of nodes) {
  if (node.startsWith('t')) {
    continue;
  }
  const list = graph.get(node);
  for (let i = 0; i < list.length; i++) {
    if (list[i].startsWith('t')) {
      continue;
    }
    for (let j = i + 1; j < list.length; j++) {
      if (list[j].startsWith('t')) {
        continue;
      }
      if (graph.get(list[i]).includes(list[j])) {
        res += 1;
      }
    }
  }
}

console.log(Math.floor((ans - res) / 3.0));
