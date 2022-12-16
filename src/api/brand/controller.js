import { success, notFound } from '../../services/response/';
import { Brand } from '.';

export const create = ({ bodymen: { body } }, res, next) => {
  Brand.create(body)
    .then((brand) => brand.view(true))
    .then(success(res, 201))
    .catch(next)
  }

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Brand.find(query, select, cursor)
    .then((brands) => brands.map((brand) => brand.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Brand.findById(params.id)
    .then(notFound(res))
    .then((brand) => brand ? brand.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Brand.findById(params.id)
    .then(notFound(res))
    .then((brand) => brand ? Object.assign(brand, body).save() : null)
    .then((brand) => brand ? brand.view(true) : null)
    .then(success(res))
    .catch(next)

export const updateOffer = ({ bodymen: { body }, params }, res, next) =>
  Brand.findById(params.id)
    .then(notFound(res))
    .then((brand) => brand ? Object.assign(brand, body).save() : null)
    .then((brand) => brand ? brand.view(true) : null)
    .then(success(res))
    .catch(next)
  
export const destroy = ({ params }, res, next) =>
  Brand.findById(params.id)
    .then(notFound(res))
    .then((brand) => brand ? brand.remove() : null)
    .then(success(res, 204))
    .catch(next)
