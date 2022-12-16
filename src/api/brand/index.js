import { Router } from 'express';
import { middleware as query } from 'querymen';
import { middleware as body } from 'bodymen';
import { master, token } from "../../services/passport";
import { create, index, show, update, destroy, updateOffer } from './controller';
import { schema } from './model';
import { ALLOW_ALL, ALLOW_ADMIN, ALLOW_WHOLE_SELLER_STAFF, ALLOW_RETAIL_STAFF } from "../../services/constant";
export Brand, { schema } from './model';

const router = new Router()
const { name, image, model, offers, status } = schema.tree

/**
 * @api {post} /brands Create brand
 * @apiName CreateBrand
 * @apiGroup Brand
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam name Brand's name.
 * @apiParam model Brand's model.
 * @apiParam offers Brand's offers.
 * @apiSuccess {Object} brand Brand's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Brand not found.
 * @apiError 401 master access only.
 */
router.post('/',
  token({ required: true, roles: [...ALLOW_WHOLE_SELLER_STAFF, ...ALLOW_RETAIL_STAFF] }),
  body({ name, image, model, offers, status }),
  create)

/**
 * @api {get} /brands Retrieve brands
 * @apiName RetrieveBrands
 * @apiGroup Brand
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} brands List of brands.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 master access only.
 */
router.get('/',
  token({ required: true, roles: [...ALLOW_ALL] }),
  query(),
  index)

/**
 * @api {get} /brands/:id Retrieve brand
 * @apiName RetrieveBrand
 * @apiGroup Brand
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess {Object} brand Brand's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Brand not found.
 * @apiError 401 master access only.
 */
router.get('/:id',
  token({ required: true, roles: [...ALLOW_ALL] }),
  show)

/**
 * @api {put} /brands/:id Update brand
 * @apiName UpdateBrand
 * @apiGroup Brand
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam name Brand's name.
 * @apiParam model Brand's model.
 * @apiParam offers Brand's offers.
 * @apiSuccess {Object} brand Brand's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Brand not found.
 * @apiError 401 master access only.
 */
router.put('/:id',
  token({ required: true, roles: [...ALLOW_WHOLE_SELLER_STAFF, ...ALLOW_RETAIL_STAFF] }),
  body({ name, image, model, offers, status }),
  update)

  /**
 * @api {put} /brands/:id/offers Update brand offers
 * @apiName UpdateBrandOffers
 * @apiGroup Brand
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam offers Brand's offers.
 * @apiSuccess {Object} brand Brand's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Brand not found.
 * @apiError 401 master access only.
 */
router.put('/:id/offers',
token({ required: true, roles: [...ALLOW_WHOLE_SELLER_STAFF, ...ALLOW_RETAIL_STAFF] }),
body({ offers }),
updateOffer)

/**
 * @api {delete} /brands/:id Delete brand
 * @apiName DeleteBrand
 * @apiGroup Brand
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Brand not found.
 * @apiError 401 master access only.
 */
router.delete('/:id',
  token({ required: true, roles: [...ALLOW_ADMIN] }),
  destroy)

export default router
