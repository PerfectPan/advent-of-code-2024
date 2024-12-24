import fs from 'fs';

// 读取输入数据
const input = fs.readFileSync('./input.txt', 'utf8');

// 解析变量和操作
const variables = new Map();
let operations = [];

input.split('\n').forEach((line) => {
  line = line.trim();
  if (!line) return;

  if (line.includes('->')) {
    // 处理操作
    const [operation, result] = line.split('->').map((s) => s.trim());
    const parts = operation.split(' ');

    if (parts.length === 3) {
      // 二元操作
      operations.push({
        type: parts[1],
        input1: parts[0],
        input2: parts[2],
        output: result,
      });
    }
  } else if (line.includes(':')) {
    // 处理变量赋值
    const [name, value] = line.split(':').map((s) => s.trim());
    variables.set(name, parseInt(value));
  }
});

// 执行逻辑运算
function executeOperation(op) {
  const input1 = variables.get(op.input1);
  const input2 = variables.get(op.input2);
  let result;

  switch (op.type) {
    case 'AND':
      result = input1 & input2;
      break;
    case 'OR':
      result = input1 | input2;
      break;
    case 'XOR':
      result = input1 ^ input2;
      break;
    default:
      throw new Error(`Unknown operation: ${op.type}`);
  }

  variables.set(op.output, result);
}

while (operations.length > 0) {
  const newOperations = [];
  for (const op of operations) {
    if (variables.has(op.input1) && variables.has(op.input2)) {
      executeOperation(op);
    } else {
      newOperations.push(op);
    }
  }
  operations = newOperations;
}

const z = [];

for (const [name, value] of variables) {
  if (name.startsWith('z')) {
    z.push([name, value]);
  }
}

z.sort((a, b) => a[0].localeCompare(b[0]));

let ans = 0,
  base = 1;

for (const [_, value] of z) {
  ans += value * base;
  base *= 2;
}

console.log(ans);
