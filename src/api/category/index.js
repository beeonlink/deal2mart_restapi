import { Router } from "express";
import { middleware as query } from "querymen";
import { middleware as body } from "bodymen";
import { token } from "../../services/passport";
import { create, index, show, update, destroy } from "./controller";
import { schema } from "./model";
import { ALLOW_ALL, ALLOW_ADMIN, ALLOW_WHOLE_SELLER_STAFF, ALLOW_RETAIL_STAFF } from "../../services/constant";
export Category, { schema } from "./model";

const router = new Router();
const { name, image, description, offer, status, user, parent } = schema.tree;

/**
 * @api {post} /categories Create category
 * @apiName createCategory
 * @apiGroup Category
 * @apiPermission token
 * @apiParam name, image, description, offer, status, user, parent.
 * @apiSuccess {Object} category data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Category not found.
 * @apiError 401 master access only.
 * @apiError 500 internal error.
 */
router.post(
  "/",
  token({ required: true, roles: [...ALLOW_WHOLE_SELLER_STAFF, ...ALLOW_RETAIL_STAFF] }),
  body({ name, image, description, offer, status, user, parent }),
  create
);

/**
 * @api {get} /categories get categories
 * @apiName getCategories
 * @apiGroup Category
 * @apiPermission token
 * @apiSuccess {Object} category data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Category not found.
 * @apiError 401 master access only.
 * @apiError 500 internal error.
 */
router.get(
  "/",
  token({ required: true, roles: [...ALLOW_ALL] }),
  query(),
  index
);

/**
 * @api {get} /categories/:id get category
 * @apiName getCategory
 * @apiGroup Category
 * @apiPermission token
 * @apiSuccess {Object} category data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Category not found.
 * @apiError 401 master access only.
 * @apiError 500 internal error.
 */
router.get(
  "/:id",
  token({ required: true, roles: [...ALLOW_ALL] }),
  query(),
  show
);

/**
 * @api {put} /categories/:id update category
 * @apiName updateCategory
 * @apiGroup Category
 * @apiPermission token
 * @apiSuccess {Object} category data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Category not found.
 * @apiError 401 master access only.
 * @apiError 500 internal error.
 */
router.put(
  "/:id",
  token({ required: true, roles: [...ALLOW_WHOLE_SELLER_STAFF, ...ALLOW_RETAIL_STAFF] }),
  body({ name, image, description, offer, status, user, parent }),
  update
);

/**
 * @api {delete} /categories/:id delete category
 * @apiName deleteCategory
 * @apiGroup Category
 * @apiPermission token
 * @apiSuccess {Object} category data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Category not found.
 * @apiError 401 master access only.
 * @apiError 500 internal error.
 */

router.delete('/:id',
  token({ required: true, roles: [...ALLOW_ADMIN] }),
  destroy
);

export default router;
