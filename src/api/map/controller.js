import { success, notFound } from "../../services/response/";
import { Map } from ".";

export const create = ({ bodymen: { body } }, res, next) =>
  Map.create(body)
    .then((map) => map.view(true))
    .then(success(res, 201))
    .catch(next);

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Map.find(query, select, cursor)
    .then((maps) => maps.map((map) => map.view()))
    .then(success(res))
    .catch(next);

export const show = ({ params }, res, next) =>
  Map.findById(params.id)
    .then(notFound(res))
    .then((map) => (map ? map.view() : null))
    .then(success(res))
    .catch(next);

export const update = ({ bodymen: { body }, params }, res, next) =>
  Map.findById(params.id)
    .then(notFound(res))
    .then((map) => (map ? Object.assign(map, body).save() : null))
    .then((map) => (map ? map.view(true) : null))
    .then(success(res))
    .catch(next);

export const destroy = ({ params }, res, next) =>
  Map.findById(params.id)
    .then(notFound(res))
    .then((map) => (map ? map.remove() : null))
    .then(success(res, 204))
    .catch(next);
