import { success, notFound } from '../../services/response/';
import { Offer } from '.';
import { Shop } from '../shop';

export const getShopsOffers = ({querymen:{query, select, cursor}, params }, res, next) => Shop.find({location: query.location})
    .then(notFound(res))
    .then((shops) => {
      let _offers = [];
      shops.map((shop) => {
        _offers.push(...shop.offers);
      });
      if(_offers.length == 0){
        res.status(500).send({
          valid: false,
          message: "This shop offer not found!"
        })
        return null;
      }
      return _offers;
    })
    .then(success(res))
    .catch(next);


export const getShopsOffer = ({querymen:{query, select, cursor}, params }, res, next) => Shop.find({location: query.location})
    .then(notFound(res))
    .then((shops) => {
      let _offer = null;
      shops.map((shop) => {
        shop.offers.map((offer) => {
          if(offer._id == params.id){
            _offer = offer;
          }
        });
      });
      if(_offer == null){
        res.status(500).send({
          valid: false,
          message: "This shop offer not found!"
        })
        return null;
      }
      return _offer;
    })
    .then(success(res))
    .catch(next)  
