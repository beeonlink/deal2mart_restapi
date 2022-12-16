import { Router } from 'express';
import { middleware as query } from 'querymen';
import { middleware as body } from 'bodymen';
import { master, token } from "../../services/passport";
import { create, index, show, update, destroy } from './controller';
import { schema } from './model';
import { ALLOW_ALL, ALLOW_ALL_ADMIN, ALLOW_WHOLE_SELLER_STAFF, ALLOW_RETAIL_STAFF } from "../../services/constant";
export Combo, { schema } from './model';

const router = new Router()
const { title, image, price, status, user, products } = schema.tree

/**
 * @api {post} /combos Create combo
 * @apiName CreateCombo
 * @apiGroup Combo
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam title Combo's title.
 * @apiParam image Combo's image.
 * @apiParam price Combo's price.
 * @apiParam status Combo's status.
 * @apiParam user Combo's user.
 * @apiParam products Combo's products.
 * @apiSuccess {Object} combo Combo's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Combo not found.
 * @apiError 401 master access only.
 */
router.post('/',
  token({ required: true, roles: [...ALLOW_WHOLE_SELLER_STAFF, ...ALLOW_RETAIL_STAFF] }),
  body({ title, image, price, status, user, products }),
  create)

/**
 * @api {get} /combos Retrieve combos
 * @apiName RetrieveCombos
 * @apiGroup Combo
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of combos.
 * @apiSuccess {Object[]} rows List of combos.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 master access only.
 */
router.get('/',
  token({ required: true, roles: [...ALLOW_ALL] }),
  query(),
  index)

/**
 * @api {get} /combos/:id Retrieve combo
 * @apiName RetrieveCombo
 * @apiGroup Combo
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess {Object} combo Combo's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Combo not found.
 * @apiError 401 master access only.
 */
router.get('/:id',
  token({ required: true, roles: [...ALLOW_ALL] }),
  show)

/**
 * @api {put} /combos/:id Update combo
 * @apiName UpdateCombo
 * @apiGroup Combo
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam title Combo's title.
 * @apiParam image Combo's image.
 * @apiParam price Combo's price.
 * @apiParam status Combo's status.
 * @apiParam user Combo's user.
 * @apiParam products Combo's products.
 * @apiSuccess {Object} combo Combo's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Combo not found.
 * @apiError 401 master access only.
 */
router.put('/:id',
  token({ required: true, roles: [...ALLOW_WHOLE_SELLER_STAFF, ...ALLOW_RETAIL_STAFF] }),
  body({ title, image, price, status, user, products }),
  update)

/**
 * @api {delete} /combos/:id Delete combo
 * @apiName DeleteCombo
 * @apiGroup Combo
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Combo not found.
 * @apiError 401 master access only.
 */
router.delete('/:id',
  token({ required: true, roles: [...ALLOW_ALL_ADMIN] }),
  destroy)

export default router
