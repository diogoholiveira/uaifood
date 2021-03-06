import "reflect-metadata"
import { createConnection } from "typeorm"
import * as express from "express"
import * as bodyParser from "body-parser"
import { Routes } from "./routes/routes"

createConnection().then(async connection => {

    const app = express()
    app.use(bodyParser.json())

    Routes.forEach(route => {
        (app as any)[route.method](route.route, (req, res, next) => {
            const result = (new (route.controller as any))[route.action](req, res, next)
            if (result instanceof Promise) {
                result.then(result => result !== null && result !== undefined ? res.send(result) : undefined)

            } else if (result !== null && result !== undefined) {
                res.json(result)
            }
        })
    })

    app.listen(3002)

    console.log("Servidor escutando na porta 3002")

}).catch(error => console.log(error))
