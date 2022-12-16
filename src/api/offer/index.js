import { Router } from 'express';
import { middleware as query, Schema } from 'querymen';
import { middleware as body } from 'bodymen';
import { master, token } from "../../services/passport";
import { create, index, show, update, destroy, getShopsOffers, getShopsOffer } from './controller';
// import { schema } from './model';
import { ALLOW_ALL, ALLOW_ALL_ADMIN, ALLOW_WHOLE_SELLER_STAFF, ALLOW_RETAIL_STAFF } from "../../services/constant";
// export Offer, { schema } from './model';

const router = new Router();

const near_by_shop_schema = new Schema(
  {
    near: { paths: ['location'] },
    term: {
      type: RegExp,
      paths: ['name'],
      bindTo: 'search'
    },
  }, 
  {
    near: true,
  }
);

/**
 * @api {get} /offers 
 * @apiName getShopsOffers
 * @apiGroup Offers
 * @apiPermission token
 * @apiParam offers.
 * @apiSuccess {Object} shop Shop's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Shop not found.
 * @apiError 401 master access only.
 */

router.get("/all", token({ required: true, roles: [...ALLOW_ALL] }), query(near_by_shop_schema), getShopsOffers);

/**
 * @api {get} /:id 
 * @apiName getShopsOffers
 * @apiGroup Offers
 * @apiPermission token
 * @apiParam offers.
 * @apiSuccess {Object} shop Shop's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Shop not found.
 * @apiError 401 master access only.
 */

router.get("/:id", token({ required: true, roles: [...ALLOW_ALL] }), query(near_by_shop_schema), getShopsOffer);

export default router
