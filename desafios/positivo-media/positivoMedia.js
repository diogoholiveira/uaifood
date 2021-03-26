var input = require('fs').readFileSync('/dev/stdin', 'utf8');
var lines = input.split('\n');

lines = lines.map(currentValue => Number(currentValue));

var positivos = lines.reduce((accumulator, currentValue) => {
  const value = (Math.sign(currentValue) === 1) ? currentValue : 0.0;
  return accumulator + value;
});

var quantidadePositivos = lines.filter(valor => (valor > 0)).length;

console.log(`${quantidadePositivos} valores positivos`)
const media = (positivos/quantidadePositivos);
console.log(media.toFixed(1));