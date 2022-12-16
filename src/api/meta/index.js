import { Router } from 'express'
import { middleware as query } from 'querymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'

const router = new Router()

/**
 * @api {post} /meta Create meta
 * @apiName CreateMeta
 * @apiGroup Meta
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess {Object} meta Meta's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Meta not found.
 * @apiError 401 admin access only.
 */
router.post('/',
  token({ required: true, roles: ['admin', 'user'] }),
  create)

/**
 * @api {get} /meta Retrieve metas
 * @apiName RetrieveMetas
 * @apiGroup Meta
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} metas List of metas.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 admin access only.
 */
router.get('/',
  token({ required: true, roles: ['admin'] }),
  query(),
  index)

/**
 * @api {get} /meta/:id Retrieve meta
 * @apiName RetrieveMeta
 * @apiGroup Meta
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess {Object} meta Meta's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Meta not found.
 * @apiError 401 admin access only.
 */
router.get('/:id',
  token({ required: true, roles: ['admin'] }),
  show)

/**
 * @api {put} /meta/:id Update meta
 * @apiName UpdateMeta
 * @apiGroup Meta
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess {Object} meta Meta's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Meta not found.
 * @apiError 401 admin access only.
 */
router.put('/:id',
  token({ required: true, roles: ['admin'] }),
  update)

/**
 * @api {delete} /meta/:id Delete meta
 * @apiName DeleteMeta
 * @apiGroup Meta
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Meta not found.
 * @apiError 401 admin access only.
 */
router.delete('/:id',
  token({ required: true, roles: ['admin'] }),
  destroy)

export default router
