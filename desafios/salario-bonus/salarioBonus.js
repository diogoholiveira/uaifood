var input = require('fs').readFileSync('/dev/stdin', 'utf8');
var lines = input.split('\n');

var nomeFuncionario = lines[0];
var salario = Number(lines[1]);
var vendas = Number(lines[2]);

var comissao = (vendas*0.15);
var total = salario + comissao;

console.log(`TOTAL = R$ ${total.toFixed(2)}`);
