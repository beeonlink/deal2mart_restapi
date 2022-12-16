import { success, notFound } from '../../services/response/'
import { Manufacturer } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Manufacturer.create(body)
    .then((manufacturer) => manufacturer.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Manufacturer.count(query)
    .then(count => Manufacturer.find(query, select, cursor)
      .then((manufacturers) => ({
        count,
        rows: manufacturers.map((manufacturer) => manufacturer.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Manufacturer.findById(params.id)
    .then(notFound(res))
    .then((manufacturer) => manufacturer ? manufacturer.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Manufacturer.findById(params.id)
    .then(notFound(res))
    .then((manufacturer) => manufacturer ? Object.assign(manufacturer, body).save() : null)
    .then((manufacturer) => manufacturer ? manufacturer.view(true) : null)
    .then(success(res))
    .catch(next)

export const updateOffer = ({ bodymen: { body }, params }, res, next) =>
  Manufacturer.findById(params.id)
    .then(notFound(res))
    .then((manufacturer) => manufacturer ? Object.assign(manufacturer, body).save() : null)
    .then((manufacturer) => manufacturer ? manufacturer.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Manufacturer.findById(params.id)
    .then(notFound(res))
    .then((manufacturer) => manufacturer ? manufacturer.remove() : null)
    .then(success(res, 204))
    .catch(next)
