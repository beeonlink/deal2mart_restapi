import { Router } from 'express';
import { middleware as query } from 'querymen';
import { middleware as body } from "bodymen";
import { master } from '../../services/passport';
import { create, show, destroy } from './controller';
import { schema } from "../user/model";

const router = new Router();
const { shop } = schema.tree;


/**
 * @api {post} /wishlist Create wishlist
 * @apiName CreateWishlist
 * @apiGroup Wishlist
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess {Object} wishlist Wishlist's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Wishlist not found.
 * @apiError 401 master access only.
 */
router.post('/:id',
  // master(),
  body({ shop }),
  create)

/**
 * @api {get} /wishlist/:id Retrieve wishlist
 * @apiName RetrieveWishlist
 * @apiGroup Wishlist
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess {Object} wishlist Wishlist's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Wishlist not found.
 * @apiError 401 master access only.
 */
router.get('/:id',
  // master(),
  show)

/**
 * @api {put} /wishlist/:id Update wishlist
 * @apiName UpdateWishlist
 * @apiGroup Wishlist
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess {Object} wishlist Wishlist's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Wishlist not found.
 * @apiError 401 master access only.
 */

router.delete('/:id',
  // master(),
  body({ shop }),
  destroy)

export default router
