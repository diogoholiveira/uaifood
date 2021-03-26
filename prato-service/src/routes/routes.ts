import { PratoController } from "../controller/PratoController"

export const Routes = [{
    method: "get",
    route: "/prato/listar",
    controller: PratoController,
    action: "all"
}, {
    method: "get",
    route: "/prato/buscar/:id",
    controller: PratoController,
    action: "one"
}, {
    method: "post",
    route: "/prato/atualizar",
    controller: PratoController,
    action: "refresh"
}, {
    method: "post",
    route: "/prato/cadastrar",
    controller: PratoController,
    action: "save"
}, {
    method: "delete",
    route: "/prato/excluir/:id",
    controller: PratoController,
    action: "remove"
}]
