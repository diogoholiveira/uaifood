var input = require('fs').readFileSync('/dev/stdin', 'utf8');
var lines = input.split('\n');

var num1 = Number(lines[0]);
var num2 = Number(lines[1]);

if (num1 > num2) {
  var tmp = num1;
  num1 = num2;
  num2 = tmp;
}

var resultado = 0;
for (let i = num1 + 1; i < num2; i++) {
  if (i % 2 !== 0) {
    resultado += i;
  }
}

console.log(resultado);
