import mongoose, { Schema } from 'mongoose'
const ObjectId = mongoose.Types.ObjectId;
import { success, notFound } from '../../services/response';
import { User } from '../user';
import { Cart } from '../cart';

export const create = ({ body }, res, next) => {


  console.log(body);

  User.findById(body.user)
  .then(notFound(res))
  .then(async (user) => {
    if(user){


      if(body.qty != null){

        if(body.qty == 0){
          Cart.deleteOne({user: body.user, product: body.product}, function(err, obj) {
            if (err) throw err;
            console.log("1 document deleted");
          });
        }else{
          Cart.findOne({user: body.user, product: body.product}).then((cart) => {
            if(cart){
              cart.qty =  body.qty;
              cart.save();      
            }else{
              Cart.create(body);  
            }
            return cart;
          })
        }
      }

      if(user.wishlist.includes(body.product)){
        user.wishlist.pull(body.product);
        // if(body.isWished) res.status(400).json({
        //   valid: false,
        //   param: 'wishlist',
        //   message: 'This ID already added in wishlist!'
        // })
      }else{  
        user.wishlist.push(body.product);
        // if(!body.isWished) res.status(400).json({
        //   valid: false,
        //   param: 'wishlist',
        //   message: 'This ID not exist in wishlist!'
        // })
      }   
      // res.status(200).json({
      //   valid: false,
      //   param: 'wishlist',
      //   message: 'This ID successfully updated!'
      // })   
      await user.save();

    }

    res.status(200).json({});

    return user;
  }).catch(next);

  
  // let _updateData, _query, _option;
  // _query = { _id : ObjectId(body.user) };
  // if(body.isWished){
  //   _updateData = {$push: { wishlist: body.product }};
  // }else{
  //   _updateData = {$pull: { wishlist: body.product }};
  // }
  // _option = {upsert: true};

  // User.updateOne( _query, _updateData, _option, (err, docs) => {     
  //     if (err) res.status(500).json({});
  //     res.status(200).json({
  //       valid: true,
  //       param: 'wishlist',
  //       message: 'This wishlist successfully updated!'
  //     })
  //   }
  // ).catch(next)
}

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  res.status(200).json([])

export const show = ({ params }, res, next) =>
  res.status(200).json({})

export const update = ({ body, params }, res, next) =>
  res.status(200).json(body)

export const destroy = ({ params }, res, next) =>
  res.status(204).end()
