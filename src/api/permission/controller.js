import { success, notFound } from '../../services/response/'
import { Permission } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Permission.create(body)
    .then((permission) => permission.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Permission.count(query)
    .then(count => Permission.find(query, select, cursor)
      .then((permissions) => ({
        count,
        rows: permissions.map((permission) => permission.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Permission.findById(params.id)
    .then(notFound(res))
    .then((permission) => permission ? permission.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Permission.findById(params.id)
    .then(notFound(res))
    .then((permission) => permission ? Object.assign(permission, body).save() : null)
    .then((permission) => permission ? permission.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Permission.findById(params.id)
    .then(notFound(res))
    .then((permission) => permission ? permission.remove() : null)
    .then(success(res, 204))
    .catch(next)
