import { success, notFound } from '../../services/response';
import { User } from '../user';
import { Shop } from '../shop';

export const create = ({ bodymen: { body }, params, user }, res, next) => {
  User.findById(params.id === 'me' ? user.id : params.id)
  .then(notFound(res))
  .then((user) => {
    if(user){
      if(user.favshop.includes(body.shop)){
        res.status(409).json({
          valid: false,
          param: 'shop',
          message: 'This shop already added!'
        })
        return user;
      }
      user.favshop.push(body.shop);
      user.save();
    }
    res.status(200).json({
      valid: true,
      param: 'shop',
      message: 'This shop successfully added!'
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
      Shop.find( { _id: { $in: user.favshop } } ).then((shops) => {
        res.status(200).json(shops);
      })
    }
  })
  .catch(next)
}
  

export const update = ({ body, params }, res, next) =>
  res.status(200).json(body)

export const destroy = ({ bodymen: { body }, params, user }, res, next) =>
User.findById(params.id === 'me' ? user.id : params.id)
  .then(notFound(res))
  .then((user) => {
    if(user){
      if(!user.favshop.includes(body.shop)){
        res.status(409).json({
          valid: false,
          param: 'shop',
          message: 'This shop not exist!'
        })
        return user;
      }
      user.favshop.pop(body.shop);
      user.save();
    }
    res.status(204).json({
      valid: true
    })
    return user;
  })
  .catch(next)
