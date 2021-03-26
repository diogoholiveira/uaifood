import "reflect-metadata"
import { createConnection } from "typeorm"
import * as express from "express"
import * as bodyParser from "body-parser"
import { Request, Response } from "express"
import { Routes } from "./routes/routes"

createConnection().then(async connection => {

    const app = express()
    app.use(bodyParser.json())

    Routes.forEach(route => {
        (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
            const result = (new (route.controller as any))[route.action](req, res, next)
            if (result instanceof Promise) {
                result.then(result => result !== null && result !== undefined ? res.send(result) : undefined)

            } else if (result !== null && result !== undefined) {
                res.json(result)
            }
        })
    })

    app.listen(3001)


    //#region alimentarBanco 
    /** TIRAR OS COMENTÁRIOS ABAIXO PARA ALIMENTAR O BANCO DE DADOS **/

    /** FIM DA ALIMENTAÇÃO DO BANCO DE DADOS **/
    //#endregion

    console.log("Servidor escutando na porta 3001")

}).catch(error => console.log(error))
