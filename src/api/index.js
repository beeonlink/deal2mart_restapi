import { Router } from "express";
import user from "./user";
import auth from "./auth";
import passwordReset from "./password-reset";
import category from './category';
import shop from './shop';
import media from './media';
import product from './product';
import map from './map';
import offer from './offer';
import wishlist from './wishlist';
import favshop from './favshop';
import meta from './meta';
import cart from './cart';
import combo from './combo'
import permission from './permission'
import brand from './brand'
import manufacturer from './manufacturer'

const router = new Router();

/**
 * @apiDefine master Master access only
 * You must pass `access_token` parameter or a Bearer Token authorization header
 * to access this endpoint.
 */
/**
 * @apiDefine admin Admin access only
 * You must pass `access_token` parameter or a Bearer Token authorization header
 * to access this endpoint.
 */
/**
 * @apiDefine user User access only
 * You must pass `access_token` parameter or a Bearer Token authorization header
 * to access this endpoint.
 */
/**
 * @apiDefine listParams
 * @apiParam {String} [q] Query to search.
 * @apiParam {Number{1..30}} [page=1] Page number.
 * @apiParam {Number{1..100}} [limit=30] Amount of returned items.
 * @apiParam {String[]} [sort=-createdAt] Order of returned items.
 * @apiParam {String[]} [fields] Fields to be returned.
 */
router.use("/users", user);
router.use("/auth", auth);
router.use("/password-resets", passwordReset);
router.use('/categories', category)
router.use('/shops', shop)
router.use('/media', media)
router.use('/products', product)
router.use('/map', map)
router.use('/offers', offer)
router.use('/wishlist', wishlist)
router.use('/favshop', favshop)
router.use('/meta', meta)
router.use('/cart', cart)
router.use('/offers', offer)
router.use('/combos', combo)
router.use('/permissions', permission)
router.use('/brands', brand)
router.use('/manufacturers', manufacturer)

export default router;
