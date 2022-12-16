import { Router } from "express";
import { middleware as query } from "querymen";
import { middleware as body } from "bodymen";
import { master } from "../../services/passport";
import { create, index, show, update, destroy } from "./controller";
import { schema } from "./model";
export Map, { schema } from "./model";

const router = new Router();
const { name } = schema.tree;

/**
 * @api {post} /map Create map
 * @apiName CreateMap
 * @apiGroup Map
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam name Map's name.
 * @apiSuccess {Object} map Map's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Map not found.
 * @apiError 401 master access only.
 */
router.post(
  "/",
  body({
    name,
    location: {
      type: {
        type: String,
      },
      coordinates: {
        type: [Number],
      },
    },
  }),
  create
);

/**
 * @api {get} /map Retrieve maps
 * @apiName RetrieveMaps
 * @apiGroup Map
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} maps List of maps.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 master access only.
 */
router.get("/", query(), index);

/**
 * @api {get} /map/:id Retrieve map
 * @apiName RetrieveMap
 * @apiGroup Map
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess {Object} map Map's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Map not found.
 * @apiError 401 master access only.
 */
router.get("/:id", show);

/**
 * @api {put} /map/:id Update map
 * @apiName UpdateMap
 * @apiGroup Map
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam name Map's name.
 * @apiSuccess {Object} map Map's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Map not found.
 * @apiError 401 master access only.
 */
router.put("/:id", body({ name }), update);

/**
 * @api {delete} /map/:id Delete map
 * @apiName DeleteMap
 * @apiGroup Map
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Map not found.
 * @apiError 401 master access only.
 */
router.delete("/:id", destroy);

export default router;
