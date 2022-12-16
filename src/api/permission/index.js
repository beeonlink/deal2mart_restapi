import { Router } from 'express';
import { middleware as query } from 'querymen';
import { middleware as body } from 'bodymen';
import { master, token } from "../../services/passport";
import { create, index, show, update, destroy } from './controller';
import { ALLOW_ALL, ALLOW_ALL_ADMIN, ALLOW_WHOLE_SELLER_STAFF, ALLOW_RETAIL_STAFF } from "../../services/constant";
import { schema } from './model';
export Permission, { schema } from './model';

const router = new Router()
const { status, allow } = schema.tree

/**
 * @api {post} /permissions Create permission
 * @apiName CreatePermission
 * @apiGroup Permission
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam status Permission's status.
 * @apiParam allow Permission's allow.
 * @apiSuccess {Object} permission Permission's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Permission not found.
 * @apiError 401 master access only.
 */
router.post('/',
  token({ required: true, roles: [...ALLOW_WHOLE_SELLER_STAFF, ...ALLOW_RETAIL_STAFF] }),
  body({ status, allow }),
  create)

/**
 * @api {get} /permissions Retrieve permissions
 * @apiName RetrievePermissions
 * @apiGroup Permission
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of permissions.
 * @apiSuccess {Object[]} rows List of permissions.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 master access only.
 */
router.get('/',
  token({ required: true, roles: [...ALLOW_ALL] }),
  query(),
  index)

/**
 * @api {get} /permissions/:id Retrieve permission
 * @apiName RetrievePermission
 * @apiGroup Permission
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess {Object} permission Permission's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Permission not found.
 * @apiError 401 master access only.
 */
router.get('/:id',
  token({ required: true, roles: [...ALLOW_ALL] }),
  show)

/**
 * @api {put} /permissions/:id Update permission
 * @apiName UpdatePermission
 * @apiGroup Permission
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam status Permission's status.
 * @apiParam allow Permission's allow.
 * @apiSuccess {Object} permission Permission's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Permission not found.
 * @apiError 401 master access only.
 */
router.put('/:id',
  token({ required: true, roles: [...ALLOW_WHOLE_SELLER_STAFF, ...ALLOW_RETAIL_STAFF] }),
  body({ status, allow }),
  update)

/**
 * @api {delete} /permissions/:id Delete permission
 * @apiName DeletePermission
 * @apiGroup Permission
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Permission not found.
 * @apiError 401 master access only.
 */
router.delete('/:id',
  token({ required: true, roles: [...ALLOW_ALL_ADMIN] }),
  destroy)

export default router
