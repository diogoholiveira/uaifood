import { CidadeController } from './../controller/CidadeController'
import { RestauranteController } from "../controller/RestauranteController"

export const Routes = [{
    method: 'post',
    route: "/restaurante/iniciarBanco",
    controller: RestauranteController,
    action: "init"
}, {
    method: "get",
    route: "/restaurante/buscar/:id",
    controller: RestauranteController,
    action: "one"
}, {
    method: "get",
    route: "/restaurante/listar",
    controller: RestauranteController,
    action: "filter"
}, {
    method: "post",
    route: "/restaurante/cadastrar",
    controller: RestauranteController,
    action: "save"
}, {
    method: "delete",
    route: "/restaurante/excluir/:id",
    controller: RestauranteController,
    action: "remove"
}, {
    method: "get",
    route: "/cidade/listar",
    controller: CidadeController,
    action: "all"
}, {
    method: "get",
    route: "/cidade/buscar/:id",
    controller: CidadeController,
    action: "one"
}, {
    method: "post",
    route: "/cidade/atualizar",
    controller: CidadeController,
    action: "save"
}, {
    method: "delete",
    route: "/cidade/excluir/:id",
    controller: CidadeController,
    action: "remove"
}]
