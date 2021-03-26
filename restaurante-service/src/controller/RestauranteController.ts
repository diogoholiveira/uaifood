import { IniciarBanco } from './../database/IniciarBanco';
import { getConnection, getRepository, PrimaryColumnCannotBeNullableError } from "typeorm"
import { NextFunction, Request, Response } from "express"
import { cnpj } from 'cpf-cnpj-validator'

import { Restaurante } from './../../../shared/entity/Restaurante'

export class RestauranteController {

    private restauranteRepository = getRepository(Restaurante)

    distance(lat1: number, lon1: number, lat2: number, lon2: number, unit: string) {
        if ((lat1 == lat2) && (lon1 == lon2)) {
            return 0
        }
        else {
            let radlat1 = Math.PI * lat1 / 180
            let radlat2 = Math.PI * lat2 / 180
            let theta = lon1 - lon2
            let radtheta = Math.PI * theta / 180
            let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta)
            if (dist > 1) {
                dist = 1
            }
            dist = Math.acos(dist)
            dist = dist * 180 / Math.PI
            dist = dist * 60 * 1.1515
            if (unit == "K") { dist = dist * 1.609344 }
            if (unit == "N") { dist = dist * 0.8684 }
            return dist
        }
    }

    async init(request: Request, responde: Response, next: NextFunction) {
        try {

            const iniciarBanco = new IniciarBanco()

            await iniciarBanco.criarCidades(getConnection())
            await iniciarBanco.criarRestaurantes(getConnection())
            await iniciarBanco.criarPratos(getConnection())

            return 'Carga inicial realizada com sucesso'
        } catch (error) {
            return `Ocorreu um erro durante a iniciação do banco de dados. Mensagem: ${error}`
        }
    }

    async filter(request: Request, response: Response, next: NextFunction) {
        const tipoCulinaria = request.body.tipoCulinaria || ''
        const nomePrato = request.body.nomePrato || ''
        const nomeCidade = request.body.nomeCidade || ''
        const siglaUf = request.body.siglaUf || ''

        let retorno = await this.restauranteRepository.createQueryBuilder("restaurante")
            .innerJoinAndSelect("restaurante.cidade", "cidade")
            .innerJoinAndSelect("restaurante.pratos", "prato")
            .where(`((restaurante.tipoCulinaria = :tipoCulinaria) or (:tipoCulinaria = ''))`, { tipoCulinaria: tipoCulinaria })
            .andWhere(`((cidade.nome = :cidade) or (:cidade = ''))`, { cidade: nomeCidade })
            .andWhere(`((cidade.siglaUf = :uf) or (:uf = ''))`, { uf: siglaUf })
            .andWhere(`prato.nome like '%${nomePrato}%'`)
            .getMany()

        const coordenadas = request.body.coordenadas
        if (coordenadas) {
            const dist = this.distance
            retorno = retorno.filter(function (element) {
                console.log(dist(element.latitude, element.longitude, coordenadas.latitude, coordenadas.longitude, 'K'))
                return (dist(element.latitude, element.longitude, coordenadas.latitude, coordenadas.longitude, 'K') <= coordenadas.raio)
            })
        }

        return retorno
    }

    async one(request: Request, response: Response, next: NextFunction) {
        return this.restauranteRepository.findOne(request.params.id)
    }

    async save(request: Request, response: Response, next: NextFunction) {
        if (!cnpj.isValid(request.body.cnpj)) return 'CNPJ inválido.'

        let retorno = await this.restauranteRepository.createQueryBuilder("restaurante")
            .where(`restaurante.cnpj = :cnpj`, { cnpj: request.body.cnpj })
            .getOne()

        if (retorno) {
            return 'Este CNPJ já foi cadastrado.'
        }

        return this.restauranteRepository.save(request.body)
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        let userToRemove = await this.restauranteRepository.findOne(request.params.id)
        await this.restauranteRepository.remove(userToRemove)
    }
}
