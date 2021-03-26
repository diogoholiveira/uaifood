import { getRepository } from "typeorm"
import { NextFunction, Request, Response } from "express"

import { Cidade } from './../../../shared/entity/Cidade'

export class CidadeController {

    private CidadeRepository = getRepository(Cidade)

    async all(request: Request, response: Response, next: NextFunction) {
        return this.CidadeRepository.find()
    }

    async one(request: Request, response: Response, next: NextFunction) {
        return this.CidadeRepository.findOne(request.params.id)
    }

    async save(request: Request, response: Response, next: NextFunction) {
        return this.CidadeRepository.save(request.body)
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        let userToRemove = await this.CidadeRepository.findOne(request.params.id)
        await this.CidadeRepository.remove(userToRemove)
    }

}
