import { Router } from "express";
import { middleware as query, Schema } from 'querymen';
import { middleware as body } from "bodymen";
import { token } from "../../services/passport";
import { 
    // Shop Functions
    addShop, getAllShops, getShop, updateShop, deleteShop, 
    // Shop Info Functions
    getShopInfo, updateShopInfo, 
    // Shop Address Functions
    getShopAddress, updateShopAddress, 
    // Shop Order Product Functions
    addShopOrder, updateShopOrderStatus,
    // Shop Product Functions
    addShopProducts, shopRecentProduct, getShopProducts, getShopProduct, updateShopProduct, removeShopProduct,
    // Shop Review Function
    addShopReviews, getAllShopReview, getShopReview, updateShopReview, removeShopReview,
    // Shop Product Review Functions
    addShopProductReviews, getShopProductAllReviews, getShopProductReview, updateShopProductReview, removeShopProductReview,
    // Shop Offer Function
    addShopOffers, getShopOffers, getShopOffer, updateShopOffer, removeShopOffer,
    // Shop Permission Function
    updateShopPermissionStatus, updateShopPermissionAllow,
    // Shop Combo Function
    addShopCombo, getShopCombos, getShopCombo, updateShopCombo, removeShopCombo
} from "./controller";
import { schema, info, address, products, reviews, permission, allow, orders } from "./model";
import { ALLOW_ALL, ALLOW_ADMIN, ALLOW_WHOLE_SELLER_STAFF, ALLOW_RETAIL_STAFF, ALLOW_ALL_ADMIN } from "../../services/constant";
import { STATUS } from "../../services/constant/options";
import { offer } from "../offer/model";
import { combo } from "../combo/model";
export Shop, { schema } from "./model";

const { name, image, description, role, category, location } = schema.tree;
const router = new Router();

//---------------------------------------------------------------------------------------------------------------//
//*********************************************           Shop          *****************************************//
//---------------------------------------------------------------------------------------------------------------//

/**
 * @api {post} /shops
 * @apiName addShop
 * @apiGroup Shop
 * @apiPermission token
 * @apiParam products.
 * @apiSuccess {Object} shop Shop's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Shop not found.
 * @apiError 401 master access only.
 */

router.post("/", token({ required: true, roles: [...ALLOW_WHOLE_SELLER_STAFF, ...ALLOW_RETAIL_STAFF] }), body({ name, image, description, role, category, location }), addShop);

/**
 * @api {get} /shops
 * @apiName getAllShops
 * @apiGroup Shops
 * @apiPermission token
 * @apiSuccess {Object} shop data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Category not found.
 * @apiError 401 master access only.
 */

router.get("/", token({ required: true, roles: [...ALLOW_ALL] }), query(), getAllShops);

/**
 * @api {get} /shops/:id
 * @apiName getShop
 * @apiGroup Shops
 * @apiPermission token
 * @apiSuccess {Object} shop data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Category not found.
 * @apiError 401 master access only.
 */

router.get("/:id", token({ required: true, roles: [...ALLOW_ALL] }), query(), getShop);
  
/**
 * @api {put} /shops/:id
 * @apiName updateShop
 * @apiGroup Shops
 * @apiPermission token
 * @apiSuccess {Object} shop data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Category not found.
 * @apiError 401 master access only.
*/

router.put("/:id", token({ required: true, roles: [...ALLOW_WHOLE_SELLER_STAFF, ...ALLOW_RETAIL_STAFF] }), body({name, image, description, role, category}), updateShop);
  
/**
 * @api {delete} /shops/:id
 * @apiName deleteShop
 * @apiGroup Shops
 * @apiPermission token
 * @apiSuccess {Object} shop data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Category not found.
 * @apiError 401 master access only.
*/

router.delete("/:id", token({ required: true, roles: [...ALLOW_ALL_ADMIN] }), query(), deleteShop);

//---------------------------------------------------------------------------------------------------------------//
//*******************************************          Shop Info          ***************************************//
//---------------------------------------------------------------------------------------------------------------//

/**
 * @api {get} /shops/:id/info
 * @apiName getShopInfo
 * @apiGroup Shop
 * @apiPermission token
 * @apiParam info.
 * @apiSuccess {Object} shop Shop's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Shop not found.
 * @apiError 401 master access only.
 */

router.get("/:id/info", token({ required: true, roles: [...ALLOW_ALL] }), query(), getShopInfo);

/**
 * @api {put} /shops/:id/info
 * @apiName updateShopInfo
 * @apiGroup Shop
 * @apiPermission token
 * @apiParam info.
 * @apiSuccess {Object} shop Shop's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Shop not found.
 * @apiError 401 master access only.
 */

router.put("/:id/info", token({ required: true, roles: [...ALLOW_WHOLE_SELLER_STAFF, ...ALLOW_RETAIL_STAFF] }), body(info), updateShopInfo);

//---------------------------------------------------------------------------------------------------------------//
//*******************************************        Shop Address         ***************************************//
//---------------------------------------------------------------------------------------------------------------//

/**
 * @api {get} /shops/:id/address
 * @apiName getShopAddress
 * @apiGroup Shop
 * @apiPermission token
 * @apiParam info.
 * @apiSuccess {Object} shop Shop's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Shop not found.
 * @apiError 401 master access only.
 */

router.get("/:id/address", token({ required: true, roles: [...ALLOW_ALL] }), query(), getShopAddress);

/**
 * @api {put} /shops/:id/address
 * @apiName updateShopAddress
 * @apiGroup Shop
 * @apiPermission token
 * @apiParam address.
 * @apiSuccess {Object} shop Shop's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Shop not found.
 * @apiError 401 master access only.
 */

router.put("/:id/address", token({ required: true, roles: [...ALLOW_WHOLE_SELLER_STAFF, ...ALLOW_RETAIL_STAFF] }), body(address), updateShopAddress);

//---------------------------------------------------------------------------------------------------------------//
//********************************************       Shop Order Products       ****************************************//
//---------------------------------------------------------------------------------------------------------------//

/**
 * @api {post} /shops/:id/orders
 * @apiName addShopOrder
 * @apiGroup Shop
 * @apiPermission token
 * @apiParam products.
 * @apiSuccess {Object} shop Shop's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Shop not found.
 * @apiError 401 master access only.
 */

router.post("/:id/orders", token({ required: true, roles: [...ALLOW_ALL] }), body(orders), addShopOrder);

/**
 * @api {put} /shops/:id/orders/:oid 
 * @apiName updateShopOrderStatus
 * @apiGroup Shop
 * @apiPermission token
 * @apiSuccess {Object} shop Shop's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Shop not found.
 * @apiError 401 master access only.
 */


router.put("/:id/orders/:oid", token({ required: true, roles: [...ALLOW_ALL] }), body({status: {
  type: String, 
  enum: STATUS,
  required: true
}}), updateShopOrderStatus);


//---------------------------------------------------------------------------------------------------------------//
//********************************************       Shop Products       ****************************************//
//---------------------------------------------------------------------------------------------------------------//

/**
 * @api {post} /shops/:id/products
 * @apiName addShopProducts
 * @apiGroup Shop
 * @apiPermission token
 * @apiParam products.
 * @apiSuccess {Object} shop Shop's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Shop not found.
 * @apiError 401 master access only.
 */

router.post("/:id/products", token({ required: true, roles: [...ALLOW_WHOLE_SELLER_STAFF, ...ALLOW_RETAIL_STAFF] }), body(products), addShopProducts);


/**
 * @api {get} /shops//:id/products/recent 
 * @apiName shopRecentProduct
 * @apiGroup Shop
 * @apiPermission token
 * @apiSuccess {Object} shop Shop's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Shop not found.
 * @apiError 401 master access only.
 */

router.get("/:id/products/recent", token({ required: true, roles: [...ALLOW_ALL] }), query(), shopRecentProduct);

/**
 * @api {get} /shops/:id/products 
 * @apiName getShopProducts
 * @apiGroup Shop
 * @apiPermission token
 * @apiSuccess {Object} shop Shop's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Shop not found.
 * @apiError 401 master access only.
 */

router.get("/:id/products", token({ required: true, roles: [...ALLOW_ALL] }), query(), getShopProducts);

/**
 * @api {get} /shops/:id/products/:pid 
 * @apiName getShopProduct
 * @apiGroup Shop
 * @apiPermission token
 * @apiSuccess {Object} shop Shop's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Shop not found.
 * @apiError 401 master access only.
 */

router.get("/:id/products/:pid", token({ required: true, roles: [...ALLOW_ALL] }), query(), getShopProduct);

/**
 * @api {get} /shops/:id/products/:pid 
 * @apiName getShopProduct
 * @apiGroup Shop
 * @apiPermission token
 * @apiSuccess {Object} shop Shop's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Shop not found.
 * @apiError 401 master access only.
 */

router.get("/:id/products/:pid", token({ required: true, roles: [...ALLOW_ALL] }), query(), getShopProduct);

/**
 * @api {put} /shops/:id/products/:pid 
 * @apiName updateShopProduct
 * @apiGroup Shop
 * @apiPermission token
 * @apiSuccess {Object} shop Shop's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Shop not found.
 * @apiError 401 master access only.
 */

router.put("/:id/products/:pid", token({ required: true, roles: [...ALLOW_WHOLE_SELLER_STAFF, ...ALLOW_RETAIL_STAFF] }), body(products), updateShopProduct);

/**
 * @api {delete} /shops/:id/products/:pid 
 * @apiName removeShopProduct
 * @apiGroup Shop
 * @apiPermission token
 * @apiSuccess {Object} shop Shop's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Shop not found.
 * @apiError 401 master access only.
 */

router.delete("/:id/products/:pid", token({ required: true, roles: [...ALLOW_ALL_ADMIN] }), query(), removeShopProduct);

//---------------------------------------------------------------------------------------------------------------//
//****************************************          Shop Reviews           **************************************//
//---------------------------------------------------------------------------------------------------------------//

/**
 * @api {post} /shops/:id/reviews 
 * @apiName addShopReviews
 * @apiGroup Shop
 * @apiPermission token
 * @apiParam reviews.
 * @apiSuccess {Object} shop Shop's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Shop not found.
 * @apiError 401 master access only.
 */

router.post("/:id/reviews", token({ required: true, roles: [...ALLOW_WHOLE_SELLER_STAFF, ...ALLOW_RETAIL_STAFF] }), body(reviews), addShopReviews);

/**
 * @api {get} /shops/:id/reviews 
 * @apiName getAllShopReview
 * @apiGroup Shop
 * @apiPermission token
 * @apiParam reviews.
 * @apiSuccess {Object} shop Shop's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Shop not found.
 * @apiError 401 master access only.
 */

router.get("/:id/reviews", token({ required: true, roles: [...ALLOW_ALL] }), query(), getAllShopReview);

/**
 * @api {get} /shops/:id/products/:pid/reviews/rid 
 * @apiName getShopReview
 * @apiGroup Shop
 * @apiPermission token
 * @apiSuccess {Object} shop Shop's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Shop not found.
 * @apiError 401 master access only.
 */

router.get("/:id/reviews/:rid", token({ required: true, roles: [...ALLOW_ALL] }), query(), getShopReview);

/**
 * @api {put} /shops/:id/reviews/rid  
 * @apiName updateShopProductReview
 * @apiGroup Shop
 * @apiPermission token
 * @apiSuccess {Object} shop Shop's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Shop not found.
 * @apiError 401 master access only.
 */

router.put("/:id/reviews/:rid", token({ required: true, roles: [...ALLOW_WHOLE_SELLER_STAFF, ...ALLOW_RETAIL_STAFF] }), body(reviews), updateShopReview);

/**
 * @api {delete} /shops/:id/reviews/rid 
 * @apiName removeShopReview
 * @apiGroup Shop
 * @apiPermission token
 * @apiSuccess {Object} shop Shop's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Shop not found.
 * @apiError 401 master access only.
 */

router.delete("/:id/reviews/:rid", token({ required: true, roles: [...ALLOW_ALL_ADMIN] }), query(), removeShopReview);

//---------------------------------------------------------------------------------------------------------------//
//****************************************           Shop Offers           **************************************//
//---------------------------------------------------------------------------------------------------------------//

/**
 * @api {post} /shops/:id/offers 
 * @apiName addShopOffers
 * @apiGroup Shop
 * @apiPermission token
 * @apiParam offer.
 * @apiSuccess {Object} shop Shop's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Shop not found.
 * @apiError 401 master access only.
 */

router.post("/:id/offers", token({ required: true, roles: [...ALLOW_WHOLE_SELLER_STAFF, ...ALLOW_RETAIL_STAFF] }), body(offer), addShopOffers);

/**
 * @api {get} /:id/offers 
 * @apiName getAllShopOffers
 * @apiGroup Shop
 * @apiPermission token
 * @apiParam offers.
 * @apiSuccess {Object} shop Shop's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Shop not found.
 * @apiError 401 master access only.
 */

router.get("/:id/offers", token({ required: true, roles: [...ALLOW_ALL] }), query(), getShopOffers);

/**
 * @api {get} /:id/offers/:offid 
 * @apiName getShopOffer
 * @apiGroup Shop
 * @apiPermission token
 * @apiSuccess {Object} shop Shop's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Shop not found.
 * @apiError 401 master access only.
 */

router.get("/:id/offers/:offid", token({ required: true, roles: [...ALLOW_ALL] }), query(), getShopOffer);

/**
 * @api {put} /:id/offers/:offid  
 * @apiName updateShopProductReview
 * @apiGroup Shop
 * @apiPermission token
 * @apiSuccess {Object} shop Shop's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Shop not found.
 * @apiError 401 master access only.
 */

router.put("/:id/offers/:offid", token({ required: true, roles: [...ALLOW_WHOLE_SELLER_STAFF, ...ALLOW_RETAIL_STAFF] }), body(offer), updateShopOffer);

/**
 * @api {delete} /shops/:id/reviews/rid 
 * @apiName removeShopReview
 * @apiGroup Shop
 * @apiPermission token
 * @apiSuccess {Object} shop Shop's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Shop not found.
 * @apiError 401 master access only.
 */

router.delete("/:id/offers/:offid", token({ required: true, roles: [...ALLOW_ALL_ADMIN] }), query(), removeShopOffer);

//---------------------------------------------------------------------------------------------------------------//
//****************************************      Shop Products Reviews      **************************************//
//---------------------------------------------------------------------------------------------------------------//

/**
 * @api {post} /shops/:id/products brands Update shop products brands
 * @apiName addShopProductReviews
 * @apiGroup Shop
 * @apiPermission token
 * @apiParam products brands.
 * @apiSuccess {Object} shop Shop's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Shop not found.
 * @apiError 401 master access only.
 */

router.post("/:id/products/:pid/reviews", token({ required: true, roles: [...ALLOW_WHOLE_SELLER_STAFF, ...ALLOW_RETAIL_STAFF] }), body(reviews), addShopProductReviews);

/**
 * @api {get} /shops/:id/products/:pid/reviews 
 * @apiName getShopProductAllReviews
 * @apiGroup Shop
 * @apiPermission token
 * @apiSuccess {Object} shop Shop's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Shop not found.
 * @apiError 401 master access only.
 */

router.get("/:id/products/:pid/reviews", token({ required: true, roles: [...ALLOW_ALL] }), query(), getShopProductAllReviews);

/**
 * @api {get} /shops/:id/products/:pid/reviews/rid 
 * @apiName getShopProductReview
 * @apiGroup Shop
 * @apiPermission token
 * @apiSuccess {Object} shop Shop's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Shop not found.
 * @apiError 401 master access only.
 */

router.get("/:id/products/:pid/reviews/:rid", token({ required: true, roles: [...ALLOW_ALL] }), query(), getShopProductReview);

/**
 * @api {put} /shops/:id/products/:pid/reviews/rid  
 * @apiName updateShopProductReview
 * @apiGroup Shop
 * @apiPermission token
 * @apiSuccess {Object} shop Shop's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Shop not found.
 * @apiError 401 master access only.
 */

router.put("/:id/products/:pid/reviews/:rid", token({ required: true, roles: [...ALLOW_WHOLE_SELLER_STAFF, ...ALLOW_RETAIL_STAFF] }), body(reviews), updateShopProductReview);

/**
 * @api {delete} /shops/:id/products/:pid/reviews/rid 
 * @apiName removeShopProductReview
 * @apiGroup Shop
 * @apiPermission token
 * @apiSuccess {Object} shop Shop's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Shop not found.
 * @apiError 401 master access only.
 */

router.delete("/:id/products/:pid/reviews/:rid", token({ required: true, roles: [...ALLOW_ALL_ADMIN] }), query(), removeShopProductReview);

//---------------------------------------------------------------------------------------------------------------//
//***************************************          Shop Permission          *************************************//
//---------------------------------------------------------------------------------------------------------------//

/**
 * @api {put} /shops/:id/permission/status
 * @apiName updateShopPermissionStatus
 * @apiGroup Shop
 * @apiPermission token
 * @apiParam status.
 * @apiSuccess {Object} shop Shop's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Shop not found.
 * @apiError 401 master access only.
 */

router.put("/:id/permission/status", token({ required: true, roles: [...ALLOW_WHOLE_SELLER_STAFF, ...ALLOW_RETAIL_STAFF] }), body(permission), updateShopPermissionStatus);

/**
 * @api {put} /shops/:id/permission/allow
 * @apiName updateShopPermissionAllow
 * @apiGroup Shop
 * @apiPermission token
 * @apiParam allow.
 * @apiSuccess {Object} shop Shop's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Shop not found.
 * @apiError 401 master access only.
 */

router.put("/:id/permission/allow", token({ required: true, roles: [...ALLOW_WHOLE_SELLER_STAFF, ...ALLOW_RETAIL_STAFF] }), body(allow), updateShopPermissionAllow);

//---------------------------------------------------------------------------------------------------------------//
//***************************************          Combo Permission         *************************************//
//---------------------------------------------------------------------------------------------------------------//

/**
 * @api {post} /shops/:id/combos
 * @apiName addShopCombo
 * @apiGroup Combo
 * @apiParam combo.
 * @apiSuccess {Object} combo's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Combo not found.
 * @apiError 401 Access Permission.
 */
router.post('/:id/combos',
  token({ required: true, roles: [...ALLOW_WHOLE_SELLER_STAFF, ...ALLOW_RETAIL_STAFF] }),
  body(combo),
  addShopCombo)

/**
 * @api {get} /shops/:id/combos
 * @apiName getShopCombos
 * @apiGroup Combo
 * @apiSuccess {Object} combo's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Combo not found.
 * @apiError 401 Access Permission.
 */
router.get('/:id/combos',
  token({ required: true, roles: [...ALLOW_ALL] }),
  query(),
  getShopCombos)

/**
 * @api {get} /shops/:id/combos/:cid
 * @apiName getShopCombo
 * @apiGroup Combo
 * @apiSuccess {Object} combo's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Combo not found.
 * @apiError 401 Access Permission.
 */
router.get('/:id/combos/:cid',
  token({ required: true, roles: [...ALLOW_ALL] }),
  query(),
  getShopCombo)

/**
 * @api {post} /shops/:id/combos
 * @apiName updateShopCombo
 * @apiGroup Combo
 * @apiParam combo.
 * @apiSuccess {Object} combo's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Combo not found.
 * @apiError 401 Access Permission.
 */
router.put('/:id/combos/:cid',
  token({ required: true, roles: [...ALLOW_WHOLE_SELLER_STAFF, ...ALLOW_RETAIL_STAFF] }),
  body(combo),
  updateShopCombo)

/**
 * @api {post} /shops/:id/combos
 * @apiName removeShopCombo
 * @apiGroup Combo
 * @apiSuccess {Object} combo's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Combo not found.
 * @apiError 401 Access Permission.
 */
router.delete('/:id/combos/:cid',
  token({ required: true, roles: [...ALLOW_ALL_ADMIN] }),
  query(),
  removeShopCombo)

export default router;
