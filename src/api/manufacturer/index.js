import { Router } from 'express';
import { middleware as query } from 'querymen';
import { middleware as body } from 'bodymen';
import { master, token } from "../../services/passport";
import { create, index, show, update, destroy, updateOffer } from './controller';
import { schema } from './model';
import { ALLOW_ALL, ALLOW_ALL_ADMIN, ALLOW_WHOLE_SELLER_STAFF, ALLOW_RETAIL_STAFF, ALLOW_ADMIN } from "../../services/constant";
export Manufacturer, { schema } from './model';

const router = new Router()
const { name, image, model, offer, status } = schema.tree

/**
 * @api {post} /manufacturers Create manufacturer
 * @apiName CreateManufacturer
 * @apiGroup Manufacturer
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam name Manufacturer's name.
 * @apiParam model Manufacturer's model.
 * @apiParam offer Manufacturer's offer.
 * @apiSuccess {Object} manufacturer Manufacturer's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Manufacturer not found.
 * @apiError 401 master access only.
 */
router.post('/',
  token({ required: true, roles: [...ALLOW_WHOLE_SELLER_STAFF, ...ALLOW_RETAIL_STAFF] }),
  body({ name, image, model, offer, status }),
  create)

/**
 * @api {get} /manufacturers Retrieve manufacturers
 * @apiName RetrieveManufacturers
 * @apiGroup Manufacturer
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of manufacturers.
 * @apiSuccess {Object[]} rows List of manufacturers.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 master access only.
 */
router.get('/',
  token({ required: true, roles: [...ALLOW_ALL] }),
  query(),
  index)

/**
 * @api {get} /manufacturers/:id Retrieve manufacturer
 * @apiName RetrieveManufacturer
 * @apiGroup Manufacturer
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess {Object} manufacturer Manufacturer's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Manufacturer not found.
 * @apiError 401 master access only.
 */
router.get('/:id',
  token({ required: true, roles: [...ALLOW_ALL] }),
  show)

/**
 * @api {put} /manufacturers/:id Update manufacturer
 * @apiName UpdateManufacturer
 * @apiGroup Manufacturer
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam name Manufacturer's name.
 * @apiParam model Manufacturer's model.
 * @apiParam offer Manufacturer's offer.
 * @apiSuccess {Object} manufacturer Manufacturer's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Manufacturer not found.
 * @apiError 401 master access only.
 */
router.put('/:id',
  token({ required: true, roles: [...ALLOW_WHOLE_SELLER_STAFF, ...ALLOW_RETAIL_STAFF] }),
  body({ name, image, model, offer, status }),
  update)

/**
 * @api {put} /manufacturers/:id/offers Update manufacturer offers
 * @apiName UpdateManufacturerOffers
 * @apiGroup Manufacturer
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam name Manufacturer's name.
 * @apiParam model Manufacturer's model.
 * @apiParam offer Manufacturer's offer.
 * @apiSuccess {Object} manufacturer Manufacturer's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Manufacturer not found.
 * @apiError 401 master access only.
 */
router.put('/:id/offers',
  token({ required: true, roles: [...ALLOW_WHOLE_SELLER_STAFF, ...ALLOW_RETAIL_STAFF] }),
  body({ offer }),
  updateOffer)

/**
 * @api {delete} /manufacturers/:id Delete manufacturer
 * @apiName DeleteManufacturer
 * @apiGroup Manufacturer
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Manufacturer not found.
 * @apiError 401 master access only.
 */
router.delete('/:id',
  token({ required: true, roles: [...ALLOW_ADMIN] }),
  destroy)

export default router
