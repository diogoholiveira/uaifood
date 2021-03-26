# [EVNTS] DESAFIO BACK-END NODEJS

## 1 Introdução

Olá!

Neste README coloquei as informações sobre a arquitetura do projeto bem como as instruções para utilizá-lo.

## 2 Descrição da solução

A API Rest foi desenvolvida utilizando Node.js versão 15.4.0 em Ubuntu 20.04.
Foram utilizados os frameworks Express.js para gerenciamento HTTP, JWT para autenticação, TypeORM para gerenciamento do banco de dados.

O banco de dados selecionado foi o MySQL, mais abaixo as instruções para gerar o banco de dados.

### 2.1 Arquitetura do software

Utilizei a arquitetura de microsserviços, distribuindo da seguinte forma:

- api-gateway - servidor que faz o proxy, validando a autenticação do usuário, gerando token e distribuindo as requisições para os demais serviços.
- restaurante-service - microsserviço responsável pelas regras de negócio relacionadas ao restaurante. Também há nele funcionalidades referentes à cidade, para não criar outro microsserviço.
- prato-service - microsserviço para gerenciar as regras de negócio dos pratos (itens do restaurante).
- também criei um quarto projeto: shared, contendo as entidades de mapeamento. Esta solução foi pensada para que não fosse necessário duplicar os fontes e nem fazer referências a projetos fora do diretório (é necessário dar npm install nesta pasta também).

## 3 Desafios

- Na raiz da solução encontra-se uma pasta chamada 'desafios', contendo os exercícios propostos no teste, com exceção da colônia de formigas. Todos foram testados utilizando a versão 8.4.0 do Node.js (a mesma da plataforma URI).
Criei um perfil no URI e as estatísticas podem ser vistas [aqui](https://www.urionlinejudge.com.br/judge/pt/profile/531994)

## 4 Instalação e configuração

### 4.1 API

Ao clonar o projeto, é necessário inicialmente instalar os pacotes, rodando o comando __npm install__ nos seguintes diretórios: api-gateway, prato-service, restaurante-service e shared.

### 4.2 Banco de dados

Conforme dito acima, utilizei o banco de dados MySQL para implementar a API. Faz-se necessária então uma instalação funcional da ferramenta. Eu utilizei a [imagem oficial do docker do mysql](https://hub.docker.com/_/mysql) e publiquei a porta 3310 (a 3306 já está ocupada para outro servidor).

Caso queira alterar as configurações de acesso é só alterar nos arquivos __ormconfig.json__ as propriedades de acesso ao servidor. Para que a aplicação funcione não é necessário criar todas as tabelas "na mão", sendo obrigatório somente criar um banco de dados chamado __uaifood__ (ou qualquer nome que deseje colocar na propriedade "database" dos acima referidos arquivos ormconfig.json)
Todas as tabelas e campos serão criadas pelo próprio ORM.

Criei três tabelas para serem utilizadas no sistema: restaurante, cidade e prato. Apesar da descrição do teste não referir a necessidade de um cadastro de cidades, deixar apenas como texto pode gerar diversos problemas de uso (digitação errada do usuário, etc), logo preferi criar uma tabela. 😁

## 5 Utilização do sistema

Para rodar: __npm start__ em cada uma das três pastas de microsserviços: api-gateway, restaurante-service, prato-service

Todas as chamadas serão direcionadas à porta 3000 (api-gateway) e este se encarregará de distribuir aos serviços responsáveis pela ação.

Eu utilizei o [Postman](https://www.postman.com/) para fazer os testes de chamadas da API.

Disponibilizei uma rota para criar dados direto no banco de dados para facilitar os testes (principalmente de consultas). Url: "POST" __localhost:3000/restaurante/iniciarBanco__. Ao executá-la irá criar algumas poucas cidades, pratos e restaurantes.

Criei uma autenticação em JWT apenas para os restaurantes gerirem seus pratos, ficando o cadastro de restaurantes livre.

Antes de fazer consultas e inserções de pratos é necessário primeiro fazer login, atravez da url "POST" __localhost:3000/loginrestaurante__. Deve-se enviar um body com um json no formato:
{
    "usuario": "user",
    "senha": "pwd"
}

Desta forma receberá um json contendo a informação "auth": true e um token que deverá ser utilizado na header das requisições de pratos.

### 5.1 Funcionalidades

GET - localhost:3000/restaurante/listar (chamada para atender à funcionalidade "Listar restaurantes").
Deve-se enviar no body um json com o seguinte formato (Podendo simplesmente ocultar os campos que não quiser utilizar na pesquisa):
{
    "tipoCulinaria": "brasileira",
    "nomePrato": "",
    "cidade": {
        "nomeCidade": "Campo Grande",
        "siglaUf": "MS"
    },
    "coordenadas": {
        "latitude": -23.783287,
        "longitude": -46.432430,
        "raio": 50
    }
}

POST - localhost:3000/restaurante/cadastrar (chamada para cadastrar um restaurante)
Exemplo:
{
    "nome": "Restaurante do João",
    "cnpj": "22.565.462/0001-99",
    "rua": "rua teste",
    "numero": "123",
    "bairro": "bairro teste",
    "complemento": "",
    "referencia": "",
    "tipoCulinaria": "brasileira",
    "latitude": -23.52249,
    "longitude": -46.7366,
    "cidade": {
        "id": 1,
        "nome": "Campo Grande",
        "siglaUf": "MS",
        "nomeUf": "Mato Grosso do Sul",
    }
}
P.S.: A cidade é só informativo para o ORM fazer o vínculo, não será cadastrada. Pode ser enviado o objeto contendo somento o id.

GET - localhost:3000/prato/listar (devolve todos os pratos de um restaurante (pelo token))
Deve enviar nos headers da requisição a chave "x-access-token", sendo seu valor obtido através da chamada __loginrestaurante__

POST - localhost:3000/prato/cadastrar (salva um prato no restaurante) - Também exige token
Exempĺo:
    {
        "nome": "bife com fritas",
        "composicao": "arroz, feijão, bife de contra filé, batata frita e salada",
        "preco": 35.43,
        "peso": 2.5,
        "restaurante": {
            "id": 1
        }
    }

POST - localhost:3000/prato/atualizar (atualiza o cadastro de um prato) - Também exige token
Exemplo:
    {
        "id": 9,
        "nome": "bife com fritas",
        "composicao": "arroz, feijão, bife de contra filé, batata frita e salada",
        "preco": 35.43,
        "peso": 2.5
    }


### 3.2 Endpoints

Para isso, precisaremos das seguintes rotas:

1. **Cadastrar Restaurante**

Receber as informações relevantes do restaurante e criar um novo cadastro do mesmo na base. Verificar se já não existe o mesmo antes de inserir. Além de todos os dados que julgar pertinente, o restaurante deve ter um **tipo de culinária** (Árabe, Brasileira, Chinesa, Francesa, frutos do mar, vegetariana, Italiana, pizza, hambúrguer, lanches, etc..).

2. **Cadastrar Item**

Dado um restaurante, cadastrar um novo item ao cardápio daquele restaurante. Este item deve conter toda e qualquer informação pertinente e, obrigatoriamente, um **preço**.


3. **Atualizar Item**

Dado um restaurante e um Item, atualizar o preço e os demais dados para os novos dados informados.


4. **Listar restaurantes**

Dado os parâmetros, trazer apenas os restaurantes que tiverem um match. Os parâmetros podem ser:
  - **Cidade:** Recebe uma cidade e retorna os restaurantes cadastrados naquela cidade
  - **Distância:** Recebe _lat_ e _lng_ e um raio (em quilômetros) e retorna apenas os restaurantes dentro da região
  - **Tipo de cozinha:** recebe o **tipo de cozinha** e retorna os restaurantes daquele tipo
  - **Prato:** recebe qualquer coisa que o cliente digitar relacionado aos pratos cadastrados (ex.: strogonoff) e traz os restaurantes que tiverem itens relacionados

A consulta pode conter um ou mais destes parâmetros e deve trazer a junção de todos.

## 6 Considerações Finais

Acredito ter passado todas as informações necessárias para explicar como pensei a solução e como fazer para rodar. Caso sobrem dúvidas sobre a operação ou configuração do ambiente, estou disponível para saná-las.

Fico no aguardo do Feedback!
Abraços,
Diogo