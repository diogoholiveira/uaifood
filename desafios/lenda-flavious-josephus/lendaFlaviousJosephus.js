var input = require('fs').readFileSync('/dev/stdin', 'utf8');
var lines = input.split('\n');

var nc = Number(lines[0]);

var cases = []
for (var i = 1; i <= nc; i++) {
  var nk = lines[i].split(' ');
  var n = Number(nk[0]);
  var k = Number(nk[1]);

  var pessoas = [];
  for (j = 1; j <= n; j++) {
    pessoas.push(j);
  }

  cases.push({ n: n, k: k, pessoas: pessoas });
}

for (var i = 0; i < nc; i++) {
  let vivos = cases[i].pessoas;
  let k = cases[i].k


  let posicao = k - 1;
    while (vivos.length > k - 1) {
      if (posicao > vivos.length - 1) {
        posicao = posicao - vivos.length;
      }
      vivos.splice(posicao, 1);
      posicao += k - 1
    }

    posicao -= k - 1

    while (vivos.length > 1) {
      posicao = posicao + k - vivos.length - 1
      while (posicao > vivos.length - 1) {
        posicao = posicao - vivos.length;
      }
      vivos.splice(posicao, 1);
    }
    console.log(`Case ${i + 1}: ${vivos[0]}`);
}
