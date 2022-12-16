import { Router } from "express";
import { middleware as query } from "querymen";
import { middleware as body } from "bodymen";
import {
  password as passwordAuth,
  master,
  token,
} from "../../services/passport";
import {
  // User Functions
  index, showMe, show, create, update, updatePassword, destroy,
  // User Profile Functions
  updateProfile, showProfile, 
  // User Preference Functions
  updatePreference, showPreference,
  // User Permission Functions
  updateUserPermissionStatus, updateUserPermissionAllow,
  // User Wishlist Functions
  addProductToWishlist, addShopToWishlist, removeProductFromWishlist, removeShopFromWishlist,
  // User Location Functions
  updateLocation,
  // User Review Function
  addUserReviews, getAllUserReview, getUserReview, updateUserReview, removeUserReview
  
} from "./controller";
import { ALLOW_ALL, ALLOW_ALL_ADMIN, ALLOW_WHOLE_SELLER_STAFF, ALLOW_RETAIL_STAFF, ALLOW_ADMIN } from "../../services/constant";

import { schema, profile, preference, permission, allow, location, reviews } from "./model";
export User, { schema } from "./model";

const router = new Router();

const { email, password, username, role,  wishlist, favshop, notification } = schema.tree;

//---------------------------------------------------------------------------------------------------------------//
//*********************************************           User          *****************************************//
//---------------------------------------------------------------------------------------------------------------//

/**
 * @api {get} /users Retrieve users
 * @apiName RetrieveUsers
 * @apiGroup User
 * @apiPermission admin
 * @apiParam {String} access_token User access_token.
 * @apiUse listParams
 * @apiSuccess {Object[]} users List of users.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 Admin access only.
 */
router.get("/", token({ required: true, roles: [...ALLOW_ALL] }), query(), index);

/**
 * @api {get} /users/me Retrieve current user
 * @apiName RetrieveCurrentUser
 * @apiGroup User
 * @apiPermission user
 * @apiParam {String} access_token User access_token.
 * @apiSuccess {Object} user User's data.
 */
router.get("/me", token({ required: true, roles: [...ALLOW_ALL] }), showMe);

/**
 * @api {get} /users/:id Retrieve user
 * @apiName RetrieveUser
 * @apiGroup User
 * @apiPermission public
 * @apiSuccess {Object} user User's data.
 * @apiError 404 User not found.
 */
router.get("/:id", token({ required: true, roles: [...ALLOW_ALL] }), show);

/**
 * @api {post} /users Create user
 * @apiName CreateUser
 * @apiGroup User
 * @apiPermission master
 * @apiParam {String} access_token Master access_token.
 * @apiParam {String} email User's email.
 * @apiParam {String{6..}} password User's password.
 * @apiParam {String} [username] User's username.
 * @apiParam {String=user,admin} [role=user] User's role.
 * @apiSuccess (Sucess 201) {Object} user User's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 Master access only.
 * @apiError 409 Email already registered.
 */
router.post("/", master(),
  // token({ required: true, roles: [...ALLOW_ALL] }),
  body({ email, password, username, role, location }), create
);

/**
 * @api {put} /users/:id Update user
 * @apiName UpdateUser
 * @apiGroup User
 * @apiPermission user
 * @apiParam {String} access_token User access_token.
 * @apiParam {String} [role] User's role.
 * @apiSuccess {Object} user User's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 Current user or admin access only.
 * @apiError 404 User not found.
 */
router.put("/:id", token({ required: true, roles: [...ALLOW_ADMIN] }), body({ role }), update);

/**
 * @api {put} /users/:id/password Update password
 * @apiName UpdatePassword
 * @apiGroup User
 * @apiHeader {String} Authorization Basic authorization with email and password.
 * @apiParam {String{6..}} password User's new password.
 * @apiSuccess (Success 201) {Object} user User's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 Current user access only.
 * @apiError 404 User not found.
 */
router.put("/:id/password", token({ required: true, roles: [...ALLOW_ALL] }), passwordAuth(), body({ password }), updatePassword);

/**
 * @api {delete} /users/:id Delete user
 * @apiName DeleteUser
 * @apiGroup User
 * @apiPermission admin
 * @apiParam {String} access_token User access_token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 401 Admin access only.
 * @apiError 404 User not found.
 */
router.delete("/:id", token({ required: true, roles: [...ALLOW_ALL_ADMIN] }), destroy);

//---------------------------------------------------------------------------------------------------------------//
//*********************************************       User Profile      *****************************************//
//---------------------------------------------------------------------------------------------------------------//

/**
 * @api {put} /users/:id Update profile
 * @apiName UpdateUser
 * @apiGroup User
 * @apiPermission user
 * @apiParam {String} access_token User access_token.
 * @apiParam {String} [profile] User's profile.
 * @apiSuccess {Object} user User's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 Current user or admin access only.
 * @apiError 404 User not found.
 */
router.put("/:id/profile", token({ required: true, roles: [...ALLOW_ALL] }), body(profile), updateProfile);

/**
 * @api {get} /users/me Retrieve current user
 * @apiName RetrieveCurrentUser
 * @apiGroup User
 * @apiPermission user
 * @apiParam {String} access_token User access_token.
 * @apiSuccess {Object} user User's data.
 */
router.get("/:id/profile", token({ required: true, roles: [...ALLOW_ALL] }), showProfile);

//---------------------------------------------------------------------------------------------------------------//
//*********************************************     User Perference     *****************************************//
//---------------------------------------------------------------------------------------------------------------//

/**
 * @api {put} /users/:id Update profile
 * @apiName UpdateUser
 * @apiGroup User
 * @apiPermission user
 * @apiParam {String} access_token User access_token.
 * @apiParam {String} [profile] User's profile.
 * @apiSuccess {Object} user User's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 Current user or admin access only.
 * @apiError 404 User not found.
 */
router.put("/:id/preference", token({ required: true, roles: [...ALLOW_ALL] }), body(preference), updatePreference);

/**
 * @api {get} /users/me Retrieve current user
 * @apiName RetrieveCurrentUser
 * @apiGroup User
 * @apiPermission user
 * @apiParam {String} access_token User access_token.
 * @apiSuccess {Object} user User's data.
 */
router.get("/:id/preference", token({ required: true, roles: [...ALLOW_ALL] }), showPreference);

//---------------------------------------------------------------------------------------------------------------//
//*********************************************       User Permission      *****************************************//
//---------------------------------------------------------------------------------------------------------------//


/**
 * @api {put} /users/:id/permission/status
 * @apiName updateShopPermissionStatus
 * @apiGroup User
 * @apiPermission token
 * @apiParam status.
 * @apiSuccess {Object} shop User's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 User not found.
 * @apiError 401 master access only.
 */

router.put("/:id/permission/status", token({ required: true, roles: [...ALLOW_WHOLE_SELLER_STAFF, ...ALLOW_RETAIL_STAFF] }), body(permission), updateUserPermissionStatus);

/**
 * @api {put} /users/:id/permission/allow
 * @apiName updateShopPermissionAllow
 * @apiGroup User
 * @apiPermission token
 * @apiParam allow.
 * @apiSuccess {Object} shop User's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 User not found.
 * @apiError 401 master access only.
 */

router.put("/:id/permission/allow", token({ required: true, roles: [...ALLOW_WHOLE_SELLER_STAFF, ...ALLOW_RETAIL_STAFF] }), body(allow), updateUserPermissionAllow);

//---------------------------------------------------------------------------------------------------------------//
//*******************************************      Product Wishlist      ****************************************//
//---------------------------------------------------------------------------------------------------------------//

/**
 * @api {put} /users/:id Update wishlist
 * @apiName addProductToWishlist
 * @apiGroup User
 * @apiPermission user
 * @apiParam {String} access_token User access_token.
 * @apiParam {String} [wishlist] User's wishlist.
 * @apiSuccess {Object} user User's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 Current user or admin access only.
 * @apiError 404 User not found.
 */
router.put("/:id/wishlist/product/:products", token({ required: true, roles: [...ALLOW_ALL] }), addProductToWishlist);

/**
 * @api {put} /users/:id
 * @apiName removeProductFromWishlist
 * @apiGroup User
 * @apiPermission user
 * @apiParam {String} access_token User access_token.
 * @apiParam {String} [wishlist] User's wishlist.
 * @apiSuccess {Object} user User's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 Current user or admin access only.
 * @apiError 404 User not found.
 */
router.delete("/:id/wishlist/product/:products", token({ required: true, roles: [...ALLOW_ALL] }), removeProductFromWishlist);

//---------------------------------------------------------------------------------------------------------------//
//*******************************************       User Wishlist      r***********r**************r*****//
//----r-------------------------------------------------------------------------------------------------------//

/**
 * @api {put} /users/:id
 * @apiName addShopToWishlist
 * @apiGroup User
 * @apiPermission user
 * @apiParam {String} access_token User access_token.
 * @apiParam {String} [wishlist] User's wishlist.
 * @apiSuccess {Object} user User's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 Current user or admin access only.
 * @apiError 404 User not found.
 */
router.put("/:id/wishlist/shop/:shops", token({ required: true, roles: [...ALLOW_ALL] }), addShopToWishlist);

/**
 * @api {put} /users/:id
 * @apiName removeShopFromWishlist
 * @apiGroup User
 * @apiPermission user
 * @apiParam {String} access_token User access_token.
 * @apiParam {String} [wishlist] User's wishlist.
 * @apiSuccess {Object} user User's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 Current user or admin access only.
 * @apiError 404 User not found.
 */
router.delete("/:id/wishlist/shop/:shops", token({ required: true, roles: [...ALLOW_ALL] }), removeShopFromWishlist);

//---------------------------------------------------------------------------------------------------------------//
//*********************************************      User Location      *****************************************//
//---------------------------------------------------------------------------------------------------------------//

/**
 * @api {put} /users/:id/location
 * @apiName updateLocation
 * @apiGroup User
 * @apiPermission user
 * @apiParam {Object} location.
 * @apiSuccess {Object} user User's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 Current user or admin access only.
 * @apiError 404 User not found.
 */
router.put("/:id/location", token({ required: true, roles: [...ALLOW_ALL] }), body(location), updateLocation);


//---------------------------------------------------------------------------------------------------------------//
//****************************************          User Reviews           **************************************//
//---------------------------------------------------------------------------------------------------------------//

/**
 * @api {post} /users/:id/reviews 
 * @apiName addUserReviews
 * @apiGroup User
 * @apiPermission token
 * @apiParam reviews.
 * @apiSuccess {Object} shop User's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 User not found.
 * @apiError 401 master access only.
 */

router.post("/:id/reviews", token({ required: true, roles: [...ALLOW_WHOLE_SELLER_STAFF, ...ALLOW_RETAIL_STAFF] }), body(reviews), addUserReviews);

/**
 * @api {get} /users/:id/reviews 
 * @apiName getAllUserReview
 * @apiGroup User
 * @apiPermission token
 * @apiParam reviews.
 * @apiSuccess {Object} shop User's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 User not found.
 * @apiError 401 master access only.
 */

router.get("/:id/reviews", token({ required: true, roles: [...ALLOW_ALL] }), query(), getAllUserReview);

/**
 * @api {get} /users/:id/products/:pid/reviews/rid 
 * @apiName getUserReview
 * @apiGroup User
 * @apiPermission token
 * @apiSuccess {Object} shop User's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 User not found.
 * @apiError 401 master access only.
 */

router.get("/:id/reviews/:rid", token({ required: true, roles: [...ALLOW_ALL] }), query(), getUserReview);

/**
 * @api {put} /users/:id/reviews/rid  
 * @apiName updateUserProductReview
 * @apiGroup User
 * @apiPermission token
 * @apiSuccess {Object} shop User's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 User not found.
 * @apiError 401 master access only.
 */

router.put("/:id/reviews/:rid", token({ required: true, roles: [...ALLOW_WHOLE_SELLER_STAFF, ...ALLOW_RETAIL_STAFF] }), body(reviews), updateUserReview);

/**
 * @api {delete} /users/:id/reviews/rid 
 * @apiName removeUserReview
 * @apiGroup User
 * @apiPermission token
 * @apiSuccess {Object} shop User's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 User not found.
 * @apiError 401 master access only.
 */

router.delete("/:id/reviews/:rid", token({ required: true, roles: [...ALLOW_ALL_ADMIN] }), query(), removeUserReview);

export default router;
