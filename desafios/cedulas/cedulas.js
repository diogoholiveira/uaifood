var input = require('fs').readFileSync('/dev/stdin', 'utf8');
var lines = input.split('\n');

var valor = Number(lines[0]);

console.log(valor);

console.log(`${Math.trunc(valor/100)} nota(s) de R$ 100,00`);
valor = (valor%100);
console.log(`${Math.trunc(valor/50)} nota(s) de R$ 50,00`);
valor = (valor%50);
console.log(`${Math.trunc(valor/20)} nota(s) de R$ 20,00`);
valor = (valor%20);
console.log(`${Math.trunc(valor/10)} nota(s) de R$ 10,00`);
valor = (valor%10);
console.log(`${Math.trunc(valor/5)} nota(s) de R$ 5,00`);
valor = (valor%5);
console.log(`${Math.trunc(valor/2)} nota(s) de R$ 2,00`);
valor = (valor%2);
console.log(`${Math.trunc(valor/1)} nota(s) de R$ 1,00`);
