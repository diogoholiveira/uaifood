import { Restaurante } from './../../../shared/entity/Restaurante';
import { getRepository } from "typeorm"
import { NextFunction, Request, Response } from "express"

import { Prato } from '../../../shared/entity/Prato'

export class PratoController {

    private pratoRepository = getRepository(Prato)

    async all(request: Request, response: Response, next: NextFunction) {
        return this.pratoRepository.find()
    }

    async one(request: Request, response: Response, next: NextFunction) {
        return this.pratoRepository.findOne(request.params.id)
    }

    async save(request: Request, response: Response, next: NextFunction) {
        if (request.body.restaurante.id !== request.body.idRestaurante) {
            return 'Cadastro não permitido. O restaurante deve ser o que está autenticado.'
        }

        return this.pratoRepository.save(request.body)
    }

    async refresh(request: Request, response: Response, next: NextFunction) {
        let retorno = await this.pratoRepository.createQueryBuilder("prato")
            .innerJoinAndSelect("prato.restaurante", "restaurante")
            .where('prato.id = :id', { id: request.body.id })
            .andWhere('restaurante.id = :idRestaurante', { idRestaurante: request.body.idRestaurante })
            .getOne()

            request.body.restaurante = {}
            request.body.restaurante.id = request.body.idRestaurante
        if (retorno) {
            return this.pratoRepository.save(request.body)
        } else {
            return 'Este prato não pertence ao restaurante autenticado.'
        }
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        let userToRemove = await this.pratoRepository.findOne(request.params.id)
        await this.pratoRepository.remove(userToRemove)
    }

}
