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

function isConnectedToAll(node, subset, graph) {
  return subset.every((v) => graph.get(node).includes(v) && graph.get(v).includes(node));
}

function findMaximumClique(graph) {
  const vertices = Array.from(graph.keys());
  let maxClique = [];
  let currentClique = [];

  function backtrack(candidates) {
    if (candidates.length === 0) {
      if (currentClique.length > maxClique.length) {
        maxClique = [...currentClique];
      }
      return;
    }

    if (currentClique.length + candidates.length <= maxClique.length) {
      return; // 剪枝：即使加入所有候选点也不会得到更大的团
    }

    const v = candidates[0];
    const remainingCandidates = candidates.slice(1);

    // 尝试加入当前节点
    if (currentClique.length === 0 || isConnectedToAll(v, currentClique, graph)) {
      currentClique.push(v);
      // 过滤出与当前节点相连的候选节点
      const newCandidates = remainingCandidates.filter(
        (u) => graph.get(v).includes(u) && graph.get(u).includes(v),
      );
      backtrack(newCandidates);
      currentClique.pop();
    }

    // 不加入当前节点
    backtrack(remainingCandidates);
  }

  backtrack(vertices);
  return maxClique;
}

// 找到最大团并输出结果
const maximumClique = findMaximumClique(graph);
console.log(maximumClique.sort().join(','));
