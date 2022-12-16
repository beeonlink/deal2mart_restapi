import { Router } from "express";
import { middleware as query } from "../../middleware/querymen";
import { middleware as body } from "bodymen";
import { master, token } from "../../services/passport";
import { create, index, show, update, destroy } from "./controller";
import { schema } from "./model";
export Product, { schema } from "./model";

const router = new Router();
const {
  name,
  image,
  offer,
  label,
  description,
  sku,
  category,
  brand,
  manufactuer,
  purchase_rate,
  retail_rate,
  qty,
  shop,
} = schema.tree;

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
  // token({ required: true, roles: ["user", "admin"] }),
  body({
    name,
    image,
    offer,
    label,
    description,
    sku,
    category,
    brand,
    manufactuer,
    purchase_rate,
    retail_rate,
    qty,
    shop,
  }),
  create
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
router.get(
  "/",
  // token({ required: true, roles: ["user", "admin"] }),
  query({
    near: { paths: ['location'] },
  }, {
    near: true
  }),
  index
);

/**
 * @api {get} /products/:id Retrieve product
 * @apiName RetrieveProduct
 * @apiGroup Product
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess {Object} product Product's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Product not found.
 * @apiError 401 master access only.
 */
router.get("/:id", token({ required: true, roles: ["user", "admin"] }), show);

/**
 * @api {put} /products/:id Update product
 * @apiName UpdateProduct
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
router.put(
  "/:id",
  token({ required: true, roles: ["user", "admin"] }),
  body({
    name,
    image,
    offer,
    label,
    description,
    sku,
    category,
    brand,
    manufactuer,
    purchase_rate,
    retail_rate,
    qty,
    shop,
  }),
  update
);

/**
 * @api {delete} /products/:id Delete product
 * @apiName DeleteProduct
 * @apiGroup Product
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Product not found.
 * @apiError 401 master access only.
 */
router.delete(
  "/:id",
  token({ required: true, roles: ["user", "admin"] }),
  destroy
);

export default router;
