var input = require('fs').readFileSync('/dev/stdin', 'utf8');
var lines = input.split('\n');

var notas = lines[0].split(' ');
var nota1 = Number(notas[0]) * 2;
var nota2 = Number(notas[1]) * 3;
var nota3 = Number(notas[2]) * 4;
var nota4 = Number(notas[3]) * 1;

var media = (nota1 + nota2 + nota3 + nota4) / 10;

console.log(`Media: ${media.toFixed(1)}`);

if (media >= 7) {
  console.log(`Aluno aprovado.`);
} else if (media < 5){
  console.log(`Aluno reprovado.`);
} else {
  console.log(`Aluno em exame.`);
  var notaExame = Number(lines[1]);
  console.log(`Nota do exame: ${notaExame.toFixed(1)}`);
  var mediaFinal = (notaExame + media) / 2;
  
  mediaFinal = Number(mediaFinal.toFixed(1));
  if (mediaFinal < 5) {
    console.log(`Aluno reprovado.`);
  } else {
    console.log(`Aluno aprovado.`);
  }

  console.log(`Media final: ${mediaFinal.toFixed(1)}`);
}