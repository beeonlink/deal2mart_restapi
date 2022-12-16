import { Router } from "express";
import { middleware as query, Schema } from 'querymen';
import { middleware as body } from "bodymen";
import { master, token } from "../../services/passport";
import { multipleUpload } from "../../services/upload/";
import { create, index, show, update, destroy } from "./controller";

import { schema } from "./model";
import { ALLOW_ALL, ALLOW_ADMIN, ALLOW_WHOLE_SELLER_STAFF, ALLOW_RETAIL_STAFF, ALLOW_ALL_ADMIN } from "../../services/constant";
export Media, { schema } from "./model";

const router = new Router();
const { name, image, category, user } = schema.tree;

/**
 * @api {post} /media Create media
 * @apiName CreateMedia
 * @apiGroup Media
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam image Media's image.
 * @apiParam category Media's category.
 * @apiSuccess {Object} media Media's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Media not found.
 * @apiError 401 master access only.
 */
router.post("/", token({ required: true, roles: [...ALLOW_WHOLE_SELLER_STAFF, ...ALLOW_RETAIL_STAFF] }), multipleUpload, body({ name, image, category, user }), create);

/**
 * @api {get} /media Retrieve media
 * @apiName RetrieveMedia
 * @apiGroup Media
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} media List of media.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 master access only.
 */

const _getSchema = new Schema({
  category: {
    type: [String],
  }
});

router.get(
  "/",
  token({ required: true, roles: [...ALLOW_ALL] }),
  query(_getSchema),
  index
);

/**
 * @api {get} /media/:id Retrieve media
 * @apiName RetrieveMedia
 * @apiGroup Media
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess {Object} media Media's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Media not found.
 * @apiError 401 master access only.
 */
router.get("/:id", token({ required: true, roles: [...ALLOW_ALL] }), show);

/**
 * @api {put} /media/:id Update media
 * @apiName UpdateMedia
 * @apiGroup Media
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam image Media's image.
 * @apiParam category Media's category.
 * @apiSuccess {Object} media Media's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Media not found.
 * @apiError 401 master access only.
 */
router.put(
  "/:id",
  token({ required: true, roles: [...ALLOW_WHOLE_SELLER_STAFF, ...ALLOW_RETAIL_STAFF] }),
  body({ name, image, category, user }),
  update
);

/**
 * @api {delete} /media/:id Delete media
 * @apiName DeleteMedia
 * @apiGroup Media
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Media not found.
 * @apiError 401 master access only.
 */
router.delete(
  "/:id",
  token({ required: true, roles: [...ALLOW_ALL_ADMIN] }),
  destroy
);

export default router;
