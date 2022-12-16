import { success, notFound } from '../../services/response/'
import { Combo } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Combo.create(body)
    .then((combo) => combo.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Combo.count(query)
    .then(count => Combo.find(query, select, cursor)
      .then((combos) => ({
        count,
        rows: combos.map((combo) => combo.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Combo.findById(params.id)
    .then(notFound(res))
    .then((combo) => combo ? combo.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Combo.findById(params.id)
    .then(notFound(res))
    .then((combo) => combo ? Object.assign(combo, body).save() : null)
    .then((combo) => combo ? combo.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Combo.findById(params.id)
    .then(notFound(res))
    .then((combo) => combo ? combo.remove() : null)
    .then(success(res, 204))
    .catch(next)
