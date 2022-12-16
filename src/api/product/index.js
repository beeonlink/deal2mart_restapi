import { Router } from "express";
import { middleware as query, Schema } from 'querymen';
// import { middleware as query } from "../../middleware/querymen";
import { middleware as body } from "bodymen";
import { master, token } from "../../services/passport";
import { create, index, recentProduct } from "./controller";
import { schema, productSchema } from "./model";
import { ALLOW_ALL } from "../../services/constant";
export Product, { schema } from "./model";

const router = new Router();


/**
 * @api {post} /products Create product
 * @apiName CreateProduct
 * @apiGroup Product
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam name Product's name.
 * @apiParam sku Product's sku.
 * @apiParam category Product's category.
 * @apiParam brand Product's brand.
 * @apiParam manufactuer Product's manufactuer.
 * @apiParam purchase_rate Product's purchase_rate.
 * @apiParam retail_rate Product's retail_rate.
 * @apiParam qty Product's qty.
 * @apiSuccess {Object} product Product's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Product not found.
 * @apiError 401 master access only.
 */
 router.post(
  "/",
  token({ required: true, roles: [...ALLOW_ALL] }),
  query(productSchema),
  create
);

/**
 * @api {get} /recent Recent products
 * @apiName RecentProducts
 * @apiGroup Product
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} products List of products.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 master access only.
 */


const recent_product_schema = new Schema(
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

router.get(
  "/recent",
  token({ required: true, roles: [...ALLOW_ALL] }),
  query(recent_product_schema),
  recentProduct
);


/**
 * @api {get} /products Retrieve products
 * @apiName RetrieveProducts
 * @apiGroup Product
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} products List of products.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 master access only.
 */


const search_schema = new Schema(
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

router.get(
  "/:sort",
  token({ required: true, roles: [...ALLOW_ALL] }),
  query(search_schema),
  index
);


export default router;
