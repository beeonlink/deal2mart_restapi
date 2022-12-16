import { success, notFound } from '../../services/response/';
import { Product } from '.';
import { Shop } from '../shop';
import { products, shop } from '../shop/model';

export const create = ({ bodymen: { body } }, res, next) => {
  Product.create(body)
    .then((product) => product.view(true))
    .then(success(res, 201))
    .catch(next)
}

export const index  = ({ querymen: { query, select, cursor } }, res, next) =>
  Product.find(query, select, cursor)
    .then((products) => products.map((product) => product.view()))
    .then(success(res))
    .catch(next)

export const show  = ({ params }, res, next) =>
  Product.findById(params.id)
    .then(notFound(res))
    .then((product) => product ? product.view() : null)
    .then(success(res))
    .catch(next)
   
export const update = ({ bodymen: { body }, params }, res, next) =>
  Product.findById(params.id)
    .then(notFound(res))
    .then((product) => product ? Object.assign(product, body).save() : null)
    .then((product) => product ? product.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Product.findById(params.id)
    .then(notFound(res))
    .then((product) => product ? product.remove() : null)
    .then(success(res, 204))
    .catch(next)
  
export const sortProduct = ({ querymen: { query, select, cursor, search }, params }, res, next)  => Shop.find({location: query.location}).then((shops) => {
    let products = [];
    shops.map((shop) => {
      products = [...products, ...shop.products];
    });
    return products;
  }).then((products) => {
    products = products.filter((product) => {
      if(search && search.name != ''){
        if(product.name.match(search.name)){
          return true;
        }
        return false;
      }
      return true;
    })
    switch(params.sort){
      case "name" : products.sort();
        break;
      case "-name" : products.reverse();
        break;
      case "price" : products.sort(function(a, b){return a.selling_price - b.selling_price});
        break;
      case "-price" : products.sort(function(a, b){return b.selling_price - a.selling_price});
        break;
      case "createdAt" : products.sort(function(a, b){return a.createdAt - b.createdAt});
        break;
      case "-createdAt" : products.sort(function(a, b){return b.createdAt - a.createdAt});
        break;
      default:
        products.sort();
    }
    return products;
  })
  .then(success(res, 200))
  .catch(next) 

export const recentProduct = ({ querymen: { query, select, cursor, search }, params }, res, next)  => Shop.find({location: query.location}).then((shops) => {
  let products = [];
  shops.map((shop) => {
    products = [...products, ...shop.products];
  });
  return products;
}).then((products) => {
  products = products.filter((product) => {
    if(search && search.name != ''){
      if(product.name.match(search.name)){
        return true;
      }
      return false;
    }
    return true;
  });
  products.sort(function(a, b){return b.createdAt - a.createdAt});
  return products.slice(0, 20);
})
.then(success(res, 200))
  .catch(next) 