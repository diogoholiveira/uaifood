import { Prato } from './../../../shared/entity/Prato';
import { Restaurante } from './../../../shared/entity/Restaurante';
import { Cidade } from './../../../shared/entity/Cidade';
import { Connection } from "typeorm"

export class IniciarBanco {
  async criarCidades(connection: Connection) {
    const cidades = [
      {
        nome: "Campo Grande",
        siglaUf: "MS",
        nomeUf: "Mato Grosso do Sul",
      },
      {
        nome: "Três Lagoas",
        siglaUf: "MS",
        nomeUf: "Mato Grosso do Sul",
      },
      {
        nome: "São Paulo",
        siglaUf: "SP",
        nomeUf: "São Paulo",
      },
      {
        nome: "Belo Horizonte",
        siglaUf: "MG",
        nomeUf: "Minas Gerais",
      }
    ]

    for (var item of cidades) {
      await connection.manager.save(connection.manager.create(Cidade, item))
    }
  }

  async criarRestaurantes(connection: Connection) {
    const restaurantes = [
      {
        nome: "brazilian food",
        cnpj: "21.691.988/0001-52",
        rua: "Av. Afonso Pena",
        numero: "3223",
        bairro: "Centro",
        complemento: "térreo",
        referencia: "em frente ao shopping",
        tipoCulinaria: "brasileira",
        latitude: -23.52249,
        longitude: -46.7366,
        usuario: "brazilian",
        senha: "123",
        token: "",
        cidade: {
          id: 1,
          nome: "Campo Grande",
          siglaUf: "MS",
          nomeUf: "Mato Grosso do Sul",
        },
      },
      {
        nome: "russian food",
        cnpj: "08.954.839/0001-70",
        rua: "Rua das Garças",
        numero: "432",
        bairro: "Jardim Paraíso",
        complemento: "",
        referencia: "",
        tipoCulinaria: "russa",
        latitude: -22.5435,
        longitude: -44.3423,
        usuario: "russian",
        senha: "123",
        token: "",
        cidade: {
          id: 2,
          nome: "Três Lagoas",
          siglaUf: "MS",
          nomeUf: "Mato Grosso do Sul",
        },
      },
      {
        nome: "arabian food",
        cnpj: "75.136.760/0001-20",
        rua: "Sebastião Lima",
        numero: "444",
        bairro: "Vila Progresso",
        complemento: "",
        referencia: "ao lado do bar do Tião",
        tipoCulinaria: "árabe",
        latitude: 0,
        longitude: 0,
        usuario: "arabian",
        senha: "123",
        token: "",
        cidade: {
          id: 3,
          nome: "São Paulo",
          siglaUf: "SP",
          nomeUf: "São Paulo",
        },
      },
      {
        nome: "Restaurante do zé",
        cnpj: "08.115.289/0001-04",
        rua: "rua teste",
        numero: "123",
        bairro: "bairro teste",
        complemento: "",
        referencia: "",
        tipoCulinaria: "brasileira",
        latitude: -23.52249,
        longitude: -46.7366,
        usuario: "ze",
        senha: "123",
        token: "",
        cidade: {
          id: 4,
          nome: "Belo Horizonte",
          siglaUf: "MG",
          nomeUf: "Minas Gerais",
        }
      }
    ]
    for (var item of restaurantes) {
      await connection.manager.save(connection.manager.create(Restaurante, item))
    }
  }

  async criarPratos(connection: Connection) {
    const pratos = [
      {
        nome: "Strogonoff",
        composicao: "frango desfiado, creme de leite, champignon, sal, batata palha",
        preco: 1,
        peso: 0,
        restaurante: {
          id: 1
        }

      },
      {
        nome: "Churrasco",
        composicao: "carne, mandioca, vinagrete, arroz branco",
        preco: 1,
        peso: 0,
        restaurante: {
          id: 2
        }

      },
      {
        nome: "picanha",
        composicao: "picanha assada",
        preco: 1,
        peso: 0,
        restaurante: {
          id: 2
        }

      },
      {
        nome: "prato feito",
        composicao: "arroz, feijão, bife, ovo frito, batata frita e salada",
        preco: 1,
        peso: 0,
        restaurante: {
          id: 3
        }

      },
      {
        nome: "bobó",
        composicao: "bobó de frango e batata palha",
        preco: 1,
        peso: 0,
        restaurante: {
          id: 4
        }

      },
      {
        nome: "costela",
        composicao: "costela assada",
        preco: 1,
        peso: 0,
        restaurante: {
          id: 3
        }

      },
      {
        nome: "frango assado",
        composicao: "frango assado e farofa",
        preco: 35.43,
        peso: 2.5,
        restaurante: {
          id: 2
        }

      },
      {
        nome: "bife a cavalo",
        composicao: "arroz, feijão, bife de contra filé, ovo frito e salada",
        preco: 35.43,
        peso: 2.5,
        restaurante: {
          id: 1
        }

      }
    ]
    for (var item of pratos) {
      await connection.manager.save(connection.manager.create(Prato, item))
    }
  }
}