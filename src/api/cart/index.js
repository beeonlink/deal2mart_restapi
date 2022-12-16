import { Router } from 'express';
import { middleware as query } from 'querymen';
import { middleware as body } from 'bodymen';
import { master } from '../../services/passport';
import { create, index, show, update, destroy } from './controller';
import { schema } from './model';
export Cart, { schema } from './model';

const router = new Router()
const { user, product, qty } = schema.tree

/**
 * @api {post} /cart Create cart
 * @apiName CreateCart
 * @apiGroup Cart
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam user Cart's user.
 * @apiParam product Cart's product.
 * @apiParam qty Cart's qty.
 * @apiSuccess {Object} cart Cart's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Cart not found.
 * @apiError 401 master access only.
 */
router.post('/',
  // master(),
  body({ user, product, qty }),
  create)

/**
 * @api {get} /cart Retrieve carts
 * @apiName RetrieveCarts
 * @apiGroup Cart
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} carts List of carts.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 master access only.
 */
router.get('/',
  // master(),
  query(),
  index)

/**
 * @api {get} /cart/:id Retrieve cart
 * @apiName RetrieveCart
 * @apiGroup Cart
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess {Object} cart Cart's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Cart not found.
 * @apiError 401 master access only.
 */
router.get('/:id',
  // master(),
  show)

/**
 * @api {put} /cart/:id Update cart
 * @apiName UpdateCart
 * @apiGroup Cart
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam user Cart's user.
 * @apiParam product Cart's product.
 * @apiParam qty Cart's qty.
 * @apiSuccess {Object} cart Cart's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Cart not found.
 * @apiError 401 master access only.
 */
router.put('/:id',
  // master(),
  body({ user, product, qty }),
  update)

/**
 * @api {delete} /cart/:id Delete cart
 * @apiName DeleteCart
 * @apiGroup Cart
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Cart not found.
 * @apiError 401 master access only.
 */
router.delete('/:id',
  // master(),
  destroy)

export default router
