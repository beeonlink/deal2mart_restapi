import { success, notFound, authorOrAdmin } from '../../services/response/';
import { User } from '.';
import { sign } from '../../services/jwt';

//---------------------------------------------------------------------------------------------------------------//
//*********************************************          User           *****************************************//
//---------------------------------------------------------------------------------------------------------------//

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
    User.find(query, select, cursor)
    .then((users) => users.map((user) => user.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
    User.findById(params.id)
    .then(notFound(res))
    .then((user) => user ? user.view() : null)
    .then(success(res))
    .catch(next)

export const showMe = ({ user }, res) => res.json(user)


export const create = ({ bodymen: { body } }, res, next) =>
  User.create(body)
    .then(user => {
      sign(user.id)
        .then((token) => ({ token, user: user.view(true) }))
        .then(success(res, 201))
    })
    .catch((err) => {
      /* istanbul ignore else */
      if (err.name === 'MongoError' && err.code === 11000) {
        res.status(409).json({
          valid: false,
          param: 'email',
          message: 'email already registered'
        })
      } else {
        next(err)
      }
    })

export const update = ({ bodymen: { body }, params, user }, res, next) => {
    return User.findById(params.id === 'me' ? user.id : params.id)
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'id'))
    .then((user) => user ? Object.assign(user, body).save() : null)
    .then((user) => user ? user.view(true) : null)
    .then(success(res))
    .catch(next)
}
export const updatePassword = ({ bodymen: { body }, params, user }, res, next) => {
  return User.findById(params.id === 'me' ? user.id : params.id)
    .then(notFound(res))
    .then((result) => {
      if (!result) return null
      const isSelfUpdate = user.id === result.id
      if (!isSelfUpdate) {
        res.status(401).json({
          valid: false,
          param: 'password',
          message: 'You can\'t change other user\'s password'
        })
        return null
      }
      return result
    })
    .then((user) => user ? user.set({ password: body.password }).save() : null)
    .then((user) => user ? user.view(true) : null)
    .then(success(res))
    .catch(next)
}
export const destroy = ({ params }, res, next) =>
    User.findById(params.id)
    .then(notFound(res))
    .then((user) => user ? user.remove() : null)
    .then(success(res, 204))
    .catch(next)
  
//---------------------------------------------------------------------------------------------------------------//
//********************************************       User Profile       *****************************************//
//---------------------------------------------------------------------------------------------------------------//

export const updateProfile = ({ bodymen: { body }, params, user }, res, next) => {
  return User.findById(params.id === 'me' ? user.id : params.id)
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'id'))
    .then((user) => user ? Object.assign(user, {profile: body}).save() : null)    
    .then((user) => user ? user.profile : null)
    .then(success(res))
    .catch(next)
  }

export const showProfile = ({ params, user }, res, next) => User.findById(params.id === 'me' ? user.id : params.id)
  .then(notFound(res))
  .then(authorOrAdmin(res, user, 'id'))
  .then((user) => user ? user.profile : null)
  .then(success(res))
  .catch(next)

//---------------------------------------------------------------------------------------------------------------//
//********************************************       User Preference       *****************************************//
//---------------------------------------------------------------------------------------------------------------//

export const updatePreference = ({ bodymen: { body }, params, user }, res, next) => {
  return User.findById(params.id === 'me' ? user.id : params.id)
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'id'))
    .then((user) => user ? Object.assign(user, {preference: body}).save() : null)    
    .then((user) => user ? user.preference : null)
    .then(success(res))
    .catch(next)
  }  

export const showPreference = ({ params, user }, res, next) => User.findById(params.id === 'me' ? user.id : params.id)
  .then(notFound(res))
  .then(authorOrAdmin(res, user, 'id'))
  .then((user) => user ? user.preference : null)
  .then(success(res))
  .catch(next)

//---------------------------------------------------------------------------------------------------------------//
//********************************************      User Permission     *****************************************//
//---------------------------------------------------------------------------------------------------------------//


export const updateUserPermissionStatus = ({ bodymen: { body }, params }, res, next) => {
  delete body.allow;
  return User.findById(params.id)
    .then(notFound(res))
    .then((user) => (user ? Object.assign(user, {permission: body}).save() : null))
    .then((user) => (user ? user.permission : null))
    .then(success(res))
    .catch(next);
}

export const updateUserPermissionAllow = ({ bodymen: { body }, params }, res, next) => {
  return User.findById(params.id)
    .then(notFound(res))
    .then(async (user) => { 
      let permission = user.permission;
      if(!permission){
        res.status(500).send({
          valid: false,
          message: "This user permission staus not found!"
        })
        return null;
      }  
      Object.assign(permission, {allow: body});
      await user.save();
      return user.permission;
    })
    .then(success(res))
    .catch(next);
}

//---------------------------------------------------------------------------------------------------------------//
//********************************************     Product Wishlist     *****************************************//
//---------------------------------------------------------------------------------------------------------------//
  
export const addProductToWishlist = ({ params, user }, res, next) => User.findById(params.id === 'me' ? user.id : params.id)
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'id'))
    .then((user) => {
      if(!user['wishlist']) user.wishlist = {};      
      if(!user.wishlist.products.includes(params.products)) user.wishlist.products.push(params.products);
      return user.save();
    })
    .then(success(res, 201, `Product ID: ${params.products} successfully added!`))
    .catch(next)

export const removeProductFromWishlist = ({ params, user }, res, next) => User.findById(params.id === 'me' ? user.id : params.id)
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'id'))
    .then((user) => {
      if(!user['wishlist']) user.wishlist = {};  
      if(user.wishlist.products.includes(params.products)){
        user.wishlist.products.pull(params.products);
      }else{
        res.status(404).json({
          valid: false,
          message: `Product ID: ${params.products} does not exist!`
        })
        return null
      }
      return user.save();
    })
    .then(success(res, 202, `Shop ID: ${params.products} successfully deleted!`))
    .catch(next)

//---------------------------------------------------------------------------------------------------------------//
//********************************************       Shop Wishlist      *****************************************//
//---------------------------------------------------------------------------------------------------------------//

export const addShopToWishlist = ({ params, user }, res, next) => User.findById(params.id === 'me' ? user.id : params.id)
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'id'))
    .then((user) => {
      if(!user['wishlist']) user.wishlist = {};      
      if(!user.wishlist.shops.includes(params.shops)) user.wishlist.shops.push(params.shops);
      return user.save();
    })
    .then(success(res, 201, `Shop ID: ${params.shops} successfully added!`))
    .catch(next)

export const removeShopFromWishlist = ({ params, user }, res, next) => User.findById(params.id === 'me' ? user.id : params.id)
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'id'))
    .then((user) => {
      if(!user['wishlist']) user.wishlist = {};  
      if(user.wishlist.shops.includes(params.shops)){ 
        user.wishlist.shops.pull(params.shops);
      }else{
        res.status(404).json({
          valid: false,
          message: `Shop ID: ${params.shops} does not exist!`
        })
        return null
      }
      return user.save();
    })
    .then(success(res, 202, `Shop ID: ${params.shops} successfully deleted!`))
    .catch(next)

//---------------------------------------------------------------------------------------------------------------//
//********************************************       User Location      *****************************************//
//---------------------------------------------------------------------------------------------------------------//

export const updateLocation = ({ bodymen: { body }, params }, res, next) => {
  return User.findById(params.id)
    .then(notFound(res))
    .then((user) => (user ? Object.assign(user, {location: body}).save() : null))
    .then((user) => (user ? user.location : null))
    .then(success(res))
    .catch(next);
}


//---------------------------------------------------------------------------------------------------------------//
//******************************************          User Reviews         **************************************//
//---------------------------------------------------------------------------------------------------------------//

export const addUserReviews = ({ bodymen: { body }, params }, res, next) => {
  return User.findById(params.id)
  .then(notFound(res))
  .then(async (user) => {    
    if(user.reviews.length > 0 && user.reviews.filter(e => e.user == body.user).length > 0){
      res.status(500).send({
        valid: false,
        message: "This user already reviewed!"
      })
      return null;
    }
    user.reviews.push(body);
    await user.save();
    return user;
  })
  .then((user) => (user.reviews.length ? user.reviews : null))
  .then(success(res))
  .catch(next);    
}

export const getAllUserReview = ({querymen:{query, select, cursor}, params }, res, next) => {
  return User.findById(params.id)
    .then(notFound(res))
    .then((user) => {
      if(user.reviews.length == 0){
        res.status(500).send({
          valid: false,
          message: "This user review not found!"
        })
        return null;
      }
      return user.reviews;
    })
    .then(success(res))
    .catch(next)  
}

export const getUserReview = ({querymen:{query, select, cursor}, params }, res, next) => {
  return User.findById(params.id)
    .then(notFound(res))
    .then((user) => {
      let review = user.reviews.id(params.rid);
      if(!review){
        res.status(500).send({
          valid: false,
          message: "This user review not found!"
        })
        return null;
      }
      return review;
    })
    .then(success(res))
    .catch(next)  
}

export const updateUserReview = ({ bodymen: { body }, params }, res, next) => {
  return User.findById(params.id)
  .then(notFound(res))
  .then(async (user) => {
    let review = user.reviews.id(params.rid);
    if(!review){
      res.status(500).send({
        valid: false,
        message: "This user review not found!"
      })
      return null;
    }
    Object.assign(review, body);
    await user.save();
    return review;
  })
  .then(success(res))
  .catch(next);    
}

export const removeUserReview = ({querymen:{query, select, cursor}, params }, res, next) => {
  User.findById(params.id)
    .then(notFound(res))
    .then(async (user) => {
      let review = user.reviews.id(params.rid);
      if(!review){
        res.status(500).send({
          valid: false,
          message: "This user review not found!"
        })
        return null;
      }  
      user.reviews.pull(review);
      return await user.save();
    })
    .then(success(res, 204))
    .catch(next);
}

