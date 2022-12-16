import { success, notFound } from "../../services/response";
import { Shop } from ".";

//---------------------------------------------------------------------------------------------------------------//
//*********************************************          Shop           *****************************************//
//---------------------------------------------------------------------------------------------------------------//

export const addShop = ({ bodymen: { body } }, res, next) => {
  return Shop.create(body)
    .then((shop) => shop.view(true))
    .then(success(res, 201))
    .catch(next);
}
  
export const getAllShops = ({querymen:{query, select, cursor}, params }, res, next) => {
  return Shop.find(query, select, cursor)
    .then((shops) => shops.map((shop) => shop.view()))
    .then(success(res))
    .catch(next);
}

export const getShop = ({querymen:{query, select, cursor}, params }, res, next) => {
  return Shop.findById(params.id)
    .then(notFound(res))
    .then((shop) => shop.view(true))
    .then(success(res, 200))
    .catch(next);
}

export const updateShop = ({ bodymen: { body }, params }, res, next) => {
  return Shop.findById(params.id)
    .then(notFound(res))
    .then((shop) => (shop ? Object.assign(shop, body).save() : null))
    .then((shop) => (shop ? shop.view('all') : null))
    .then(success(res, 200))
    .catch(next);
}

export const deleteShop = ({ params }, res, next) =>
  Shop.findById(params.id)
    .then(notFound(res))
    .then((shop) => (shop ? shop.remove() : null))
    .then(success(res, 204))
    .catch(next);

//---------------------------------------------------------------------------------------------------------------//
//*********************************************          Info           *****************************************//
//---------------------------------------------------------------------------------------------------------------//

export const getShopInfo = ({querymen:{query, select, cursor}, params }, res, next) => {
  return Shop.findById(params.id)
    .then(notFound(res))
    .then((shop) => (shop ? shop.info : null))
    .then(success(res, 200))
    .catch(next);
}

export const updateShopInfo = ({ bodymen: { body }, params }, res, next) => {
  return Shop.findById(params.id)
    .then(notFound(res))
    .then((shop) => (shop ? Object.assign(shop, {info: body}).save() : null))
    .then((shop) => (shop ? shop.view('info') : null))
    .then(success(res))
    .catch(next);
}

//---------------------------------------------------------------------------------------------------------------//
//*********************************************        Address          *****************************************//
//---------------------------------------------------------------------------------------------------------------//

export const getShopAddress = ({querymen:{query, select, cursor}, params }, res, next) => {
  return Shop.findById(params.id)
    .then(notFound(res))
    .then((shop) => (shop ? shop.address : null))
    .then(success(res, 200))
    .catch(next);
}

export const updateShopAddress = ({ bodymen: { body }, params }, res, next) => {
  return Shop.findById(params.id)
    .then(notFound(res))
    .then((shop) => (shop ? Object.assign(shop, {address: body}).save() : null))
    .then((shop) => (shop ? shop.view('address') : null))
    .then(success(res))
    .catch(next);
}

//---------------------------------------------------------------------------------------------------------------//
//*********************************************          Order          *****************************************//
//---------------------------------------------------------------------------------------------------------------//

export const addShopOrder = ({ bodymen: { body }, params }, res, next) => {  
  return Shop.findById(params.id)
  .then(notFound(res))
  .then(async (shop) => {    
    let orders = shop.orders;
    let products = shop.products;
    let isNone = true;
    let total = body.total;
    body.total = 0.0;

    products.map((product) => {      
      body.items.filter(item => {  
        if(item.pid == undefined){
          res.status(500).send({
            valid: false,
            message: "This product id required!"
          })
          return null;
        }    
        if(item.pid == product._id){
          isNone = false;

          if(product.qty < item.qty){
            res.status(500).send({
              valid: false,
              message: "This product quantity not enough!"
            })
            return null;
          }          
          product.qty = product.qty - item.qty;
          let price = item.price;
          item.price = product.selling_price;
          if(price != item.price){
            res.status(500).send({
              valid: false,
              message: "This item price is invalid!"
            })
            return null;
          }
          let subtotal = item.subtotal;
          item.subtotal = product.selling_price * item.qty;
          if(subtotal != item.subtotal){
            res.status(500).send({
              valid: false,
              message: "This item subtotal is invalid!"
            })
            return null;
          }
          body.total = body.total + item.subtotal;
        }        
        return item;
      })
      return product;
    });

    if(isNone){
      res.status(500).send({
        valid: false,
        message: "This product id is invalid!"
      })
      return null;
    }

    if(total != body.total){
      res.status(500).send({
        valid: false,
        message: "This product total is invalid!"
      })
      return null;
    }

    orders.push(body);
    await shop.save();
    return orders[orders.length-1];
  })
  .then(success(res))
  .catch(next);    
}


export const updateShopOrderStatus = ({ bodymen: { body }, params }, res, next) => {
  return Shop.findById(params.id)
  .then(notFound(res))
  .then(async (shop) => {
    let order = shop.orders.id(params.oid);
    if(!order){
      res.status(500).send({
        valid: false,
        message: "This order not found!"
      })
      return null;
    }  
    order.status = body.status;
    await shop.save();
    return order;
  })
  .then(success(res))
  .catch(next);    
}


//---------------------------------------------------------------------------------------------------------------//
//*********************************************         Products        *****************************************//
//---------------------------------------------------------------------------------------------------------------//


export const addShopProducts = ({ bodymen: { body }, params }, res, next) => {  
  return Shop.findById(params.id)
  .then(notFound(res))
  .then(async (shop) => {    
    let products = shop.products;
    if(products.length > 0 && products.filter(e => e.name == body.name).length > 0){
      res.status(500).send({
        valid: false,
        message: "This product name already exist!"
      })
      return null;
    }
    products.push(body);
    await shop.save();
    return products;
  })
  .then(success(res))
  .catch(next);    
}

export const shopRecentProduct = ({ querymen: { query, select, cursor }, params }, res, next)  => Shop.findById(params.id)
  .then(notFound(res))
  .then((shop) => {
  return shop.products;
}).then((products) => {  
  products.sort(function(a, b){return b.createdAt - a.createdAt});
  return products.slice(0, 20);
})
.then(success(res, 200))
.catch(next) 

// export const getAllShopProducts = ({querymen:{query, select, cursor}, params }, res, next) => {
//   return Shop.findById(params.id)
//     .then(notFound(res))
//     .then((shop) => {
//       let products;
//       if(query.sku){
//         products = shop.products.filter((v) => v.sku == query.sku);
//       }else{
//         products = shop.products;
//       }
//       if(!products || products.length == 0){
//         res.status(500).send({
//           valid: false,
//           message: "Products not found!"
//         })  
//         return null;
//       }
//       return products;
//     })
//     .then(success(res))
//     .catch(next)  
// }

export const getShopProducts = ({querymen:{query, select, cursor}, params }, res, next) => {
  return Shop.findById(params.id)
    .then(notFound(res))
    .then((shop) => {
      if(!shop.products || shop.products.length == 0){
        res.status(500).send({
          valid: false,
          message: "Products not found!"
        })  
        return null;
      }
      return shop.products;
    })
    .then(success(res))
    .catch(next)  
}

export const getShopProduct = ({querymen:{query, select, cursor}, params }, res, next) => {
  return Shop.findById(params.id)
  .then(notFound(res))
  .then(async (shop) => {
    let product = shop.products.id(params.pid);
    if(!product){
      res.status(500).send({
        valid: false,
        message: "This product not found!"
      })
      return null;
    }  
    return product;
  })
  .then(success(res))
  .catch(next);    
}

export const updateShopProduct = ({ bodymen: { body }, params }, res, next) => {
  return Shop.findById(params.id)
  .then(notFound(res))
  .then(async (shop) => {
    let product = shop.products.id(params.pid);
    if(!product){
      res.status(500).send({
        valid: false,
        message: "This product not found!"
      })
      return null;
    }  
    await Object.assign(product, body).save();
    return product;
  })
  .then(success(res))
  .catch(next);    
}

export const removeShopProduct = ({querymen:{query, select, cursor}, params }, res, next) => {
  return Shop.findById(params.id)
    .then(notFound(res))
    .then(async (shop) => {
      let product = shop.products.id(params.pid);
      if(!product){
        res.status(500).send({
          valid: false,
          message: "This product not found!"
        })
        return null;
      }  
      shop.products.pull(product);
      return await shop.save();
    })
    .then(success(res, 204))
    .catch(next);
}

//---------------------------------------------------------------------------------------------------------------//
//******************************************          Shop Reviews         **************************************//
//---------------------------------------------------------------------------------------------------------------//

export const addShopReviews = ({ bodymen: { body }, params }, res, next) => {
  return Shop.findById(params.id)
  .then(notFound(res))
  .then(async (shop) => {    
    if(shop.reviews.length > 0 && shop.reviews.filter(e => e.user == body.user).length > 0){
      res.status(500).send({
        valid: false,
        message: "This user already reviewed!"
      })
      return null;
    }
    shop.reviews.push(body);
    await shop.save();
    return shop;
  })
  .then((shop) => (shop.reviews.length ? shop.reviews : null))
  .then(success(res))
  .catch(next);    
}

export const getAllShopReview = ({querymen:{query, select, cursor}, params }, res, next) => {
  return Shop.findById(params.id)
    .then(notFound(res))
    .then((shop) => {
      if(shop.reviews.length == 0){
        res.status(500).send({
          valid: false,
          message: "This shop review not found!"
        })
        return null;
      }
      return shop.reviews;
    })
    .then(success(res))
    .catch(next)  
}

export const getShopReview = ({querymen:{query, select, cursor}, params }, res, next) => {
  return Shop.findById(params.id)
    .then(notFound(res))
    .then((shop) => {
      let review = shop.reviews.id(params.rid);
      if(!review){
        res.status(500).send({
          valid: false,
          message: "This shop review not found!"
        })
        return null;
      }
      return review;
    })
    .then(success(res))
    .catch(next)  
}

export const updateShopReview = ({ bodymen: { body }, params }, res, next) => {
  return Shop.findById(params.id)
  .then(notFound(res))
  .then(async (shop) => {
    let review = shop.reviews.id(params.rid);
    if(!review){
      res.status(500).send({
        valid: false,
        message: "This shop review not found!"
      })
      return null;
    }
    Object.assign(review, body);
    await shop.save();
    return review;
  })
  .then(success(res))
  .catch(next);    
}

export const removeShopReview = ({querymen:{query, select, cursor}, params }, res, next) => {
  Shop.findById(params.id)
    .then(notFound(res))
    .then(async (shop) => {
      let review = shop.reviews.id(params.rid);
      if(!review){
        res.status(500).send({
          valid: false,
          message: "This shop review not found!"
        })
        return null;
      }  
      shop.reviews.pull(review);
      return await shop.save();
    })
    .then(success(res, 204))
    .catch(next);
}

//---------------------------------------------------------------------------------------------------------------//
//******************************************        Products Reviews       **************************************//
//---------------------------------------------------------------------------------------------------------------//

export const addShopProductReviews = ({ bodymen: { body }, params }, res, next) => {
  return Shop.findById(params.id)
  .then(notFound(res))
  .then(async (shop) => {
    let product = shop.products.id(params.pid);
    if(product){
      if(product.reviews.length > 0 && product.reviews.filter(e => e.user == body.user).length > 0){
        res.status(500).send({
          valid: false,
          message: "This user already reviewed!"
        })
        return null;
      }
      product.reviews.push(body);
    }else{
      res.status(500).send({
        valid: false,
        message: "This product not found!"
      })
      return null;
    }
    await shop.save();
    return product;
  })
  .then((product) => (product.reviews.length ? product.reviews : null))
  .then(success(res))
  .catch(next);    
}

export const getShopProductAllReviews = ({querymen:{query, select, cursor}, params }, res, next) => {
  return Shop.findById(params.id)
    .then(notFound(res))
    .then((shop) => {
      let product = shop.products.id(params.pid);
      if(product){
        if(product.reviews.length == 0){
          res.status(500).send({
            valid: false,
            message: "This product reviews not found!"
          })
          return null;
        }
      }else{
        res.status(500).send({
          valid: false,
          message: "This product not found!"
        })
        return null;
      }
      return product.reviews;
    })
    .then(success(res))
    .catch(next)  
}

export const getShopProductReview = ({querymen:{query, select, cursor}, params }, res, next) => {
  return Shop.findById(params.id)
    .then(notFound(res))
    .then((shop) => {
      let product = shop.products.id(params.pid);
      if(!product){
        res.status(500).send({
          valid: false,
          message: "This product not found!"
        })
        return null;
      }
      let review = product.reviews.id(params.rid);
      if(!review){
        res.status(500).send({
          valid: false,
          message: "This product review not found!"
        })
        return null;
      }
      return review;
    })
    .then(success(res))
    .catch(next)  
}

export const updateShopProductReview = ({ bodymen: { body }, params }, res, next) => {
  return Shop.findById(params.id)
  .then(notFound(res))
  .then(async (shop) => {
    let product = shop.products.id(params.pid);
    if(!product){
      res.status(500).send({
        valid: false,
        message: "This product not found!"
      })
      return null;
    }
    let review = product.reviews.id(params.rid);
    if(!review){
      res.status(500).send({
        valid: false,
        message: "This product review not found!"
      })
      return null;
    }
    await Object.assign(review, body).save();
    return review;
  })
  .then(success(res))
  .catch(next);    
}

export const removeShopProductReview = ({querymen:{query, select, cursor}, params }, res, next) => {
  Shop.findById(params.id)
    .then(notFound(res))
    .then(async (shop) => {
      let product = shop.products.id(params.pid);
      if(!product){
        res.status(500).send({
          valid: false,
          message: "This product not found!"
        })
        return null;
      }
      let review = product.reviews.id(params.rid);
      if(!review){
        res.status(500).send({
          valid: false,
          message: "This product review not found!"
        })
        return null;
      }  
      product.reviews.pull(review);
      return await shop.save();
    })
    .then(success(res, 204))
    .catch(next);
}

//---------------------------------------------------------------------------------------------------------------//
//******************************************          Shop Offers          **************************************//
//---------------------------------------------------------------------------------------------------------------//

export const addShopOffers = ({ bodymen: { body }, params }, res, next) => {
  return Shop.findById(params.id)
  .then(notFound(res))
  .then(async (shop) => {   
    let offers = shop.offers;
    if(offers.length > 0 && offers.filter(e => e.title == body.title).length > 0){
      res.status(500).send({
        valid: false,
        message: "This shop offer title already exist!"
      })
      return null;
    }
    offers.push(body);
    await shop.save();
    return offers;
  })
  .then(success(res))
  .catch(next);    
}

export const getShopOffers = ({querymen:{query, select, cursor}, params }, res, next) => {
  return Shop.findById(params.id)
    .then(notFound(res))
    .then((shop) => {
      let offers = shop.offers;
      if(offers.length == 0){
        res.status(500).send({
          valid: false,
          message: "This shop offer not found!"
        })
        return null;
      }
      return offers;
    })
    .then(success(res))
    .catch(next)  
}

export const getShopOffer = ({querymen:{query, select, cursor}, params }, res, next) => {
  return Shop.findById(params.id)
    .then(notFound(res))
    .then((shop) => {
      let offer = shop.offers.id(params.offid);
      if(!offer){
        res.status(500).send({
          valid: false,
          message: "This shop offer not found!"
        })
        return null;
      }
      return offer;
    })
    .then(success(res))
    .catch(next)  
}

export const updateShopOffer = ({ bodymen: { body }, params }, res, next) => {
  return Shop.findById(params.id)
  .then(notFound(res))
  .then(async (shop) => {
    let offer = shop.offers.id(params.offid);
    if(!offer){
      res.status(500).send({
        valid: false,
        message: "This shop offer not found!"
      })
      return null;
    }
    Object.assign(offer, body);
    await shop.save();
    return offer;
  })
  .then(success(res))
  .catch(next);    
}

export const removeShopOffer = ({querymen:{query, select, cursor}, params }, res, next) => {
  Shop.findById(params.id)
    .then(notFound(res))
    .then(async (shop) => {
      let offer = shop.offers.id(params.offid);
      if(!offer){
        res.status(500).send({
          valid: false,
          message: "This shop offer not found!"
        })
        return null;
      }  
      shop.offers.pull(offer);
      return await shop.save();
    })
    .then(success(res, 204))
    .catch(next);
}

//---------------------------------------------------------------------------------------------------------------//
//****************************************          Shop Permission         *************************************//
//---------------------------------------------------------------------------------------------------------------//

export const updateShopPermissionStatus = ({ bodymen: { body }, params }, res, next) => {
  delete body.allow;
  return Shop.findById(params.id)
    .then(notFound(res))
    .then((shop) => (shop ? Object.assign(shop, {permission: body}).save() : null))
    .then((shop) => (shop ? shop.view('permission') : null))
    .then(success(res))
    .catch(next);
}

export const updateShopPermissionAllow = ({ bodymen: { body }, params }, res, next) => {
  return Shop.findById(params.id)
    .then(notFound(res))
    .then(async (shop) => { 
      let permission = shop.permission;
      if(!permission){
        res.status(500).send({
          valid: false,
          message: "This shop permission staus not found!"
        })
        return null;
      }  
      Object.assign(permission, {allow: body});
      await shop.save();
      return shop.permission;
    })
    .then(success(res))
    .catch(next);
}

//---------------------------------------------------------------------------------------------------------------//
//****************************************           Shop Combos            *************************************//
//---------------------------------------------------------------------------------------------------------------//

export const addShopCombo = ({ bodymen: { body }, params }, res, next) => {
  return Shop.findById(params.id)
  .then(notFound(res))
  .then(async (shop) => {   
    let combos = shop.combos;
    if(combos.length > 0 && combos.filter(e => e.title == body.title).length > 0){
      res.status(500).send({
        valid: false,
        message: "This shop combo title already exist!"
      })
      return null;
    }
    combos.push(body);
    await shop.save();
    return combos;
  })
  .then(success(res))
  .catch(next);    
}

export const getShopCombos = ({querymen:{query, select, cursor}, params }, res, next) => {
  return Shop.findById(params.id)
    .then(notFound(res))
    .then((shop) => {
      let combos = shop.combos;
      if(combos.length == 0){
        res.status(500).send({
          valid: false,
          message: "This shop combo not found!"
        })
        return null;
      }
      return combos;
    })
    .then(success(res))
    .catch(next)  
}

export const getShopCombo = ({querymen:{query, select, cursor}, params }, res, next) => {
  return Shop.findById(params.id)
    .then(notFound(res))
    .then((shop) => {
      let combo = shop.combos.id(params.cid);
      if(!combo){
        res.status(500).send({
          valid: false,
          message: "This shop combo not found!"
        })
        return null;
      }
      return combo;
    })
    .then(success(res))
    .catch(next)  
}

export const updateShopCombo = ({ bodymen: { body }, params }, res, next) => {
  return Shop.findById(params.id)
  .then(notFound(res))
  .then(async (shop) => {
    let combo = shop.combos.id(params.cid);
    if(!combo){
      res.status(500).send({
        valid: false,
        message: "This shop combo not found!"
      })
      return null;
    }
    Object.assign(combo, body);
    await shop.save();
    return combo;
  })
  .then(success(res))
  .catch(next);    
}

export const removeShopCombo = ({querymen:{query, select, cursor}, params }, res, next) => {
  Shop.findById(params.id)
    .then(notFound(res))
    .then(async (shop) => {
      let combo = shop.combos.id(params.cid);
      if(!combo){
        res.status(500).send({
          valid: false,
          message: "This shop combo not found!"
        })
        return null;
      }  
      shop.combos.pull(combo);
      return await shop.save();
    })
    .then(success(res, 204))
    .catch(next);
}
