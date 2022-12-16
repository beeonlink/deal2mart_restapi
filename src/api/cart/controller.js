import { success, notFound } from '../../services/response/'
import { Cart } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Cart.create(body)
    .then((cart) => cart.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Cart.find(query, select, cursor)
    .then((carts) => carts.map((cart) => cart.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Cart.findById(params.id)
    .then(notFound(res))
    .then((cart) => cart ? cart.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Cart.findById(params.id)
    .then(notFound(res))
    .then((cart) => cart ? Object.assign(cart, body).save() : null)
    .then((cart) => cart ? cart.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Cart.findById(params.id)
    .then(notFound(res))
    .then((cart) => cart ? cart.remove() : null)
    .then(success(res, 204))
    .catch(next)
