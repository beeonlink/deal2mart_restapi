import { success, notFound } from '../../services/response/';
import { User } from '../user/.';
import { Product } from '../product/.';

export const create = ({ bodymen: { body }, params, user }, res, next) => {
  User.findById(params.id === 'me' ? user.id : params.id)
  .then(notFound(res))
  .then((user) => {
    if(user){
      if(user.wishlist.includes(body.product)){
        res.status(409).json({
          valid: false,
          param: 'product',
          message: 'This product already added!'
        })
        return user;
      }
      user.wishlist.push(body.product);
      user.save();
    }
    res.status(200).json({
      valid: true,
      param: 'product',
      message: 'This product successfully added!'
    })
    return user;
  })
  .catch(next)
}

export const index = ({ querymen: { query, select, cursor } }, res, next) => {
  
  res.status(200).json([])
}
  
export const show = ({ params }, res, next) => {
  User.findById(params.id === 'me' ? user.id : params.id)
  .then(notFound(res))
  .then((user) => {
    if(user){
      Product.find( { _id: { $in: user.wishlist } } ).then((products) => {
        res.status(200).json(products);
      })
    }
  })
  .catch(next)
}
  

export const update = ({ body, params }, res, next) =>
  res.status(200).json(body)

export const destroy = ({ bodymen: { body }, params, user }, res, next) => {

User.aggregate().destroy()

User.findById(params.id === 'me' ? user.id : params.id)
  .then(notFound(res))
  .then((user) => {
    if(user){


      if(!user.wishlist.includes(body.product)){
        res.status(409).json({
          valid: false,
          param: 'product',
          message: 'This product not exist!'
        })
        return user;
      }

      user.wishlist = [...user.wishlist].filter(id => id != body.product);
      user.save();
    }
    res.status(204).json({
      valid: true
    })
    return user;
  })
  .catch(next)
}
