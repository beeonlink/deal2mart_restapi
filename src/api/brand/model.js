import mongoose, { Schema } from 'mongoose';
import { STATUS } from "../../services/constant/options";
import { offerSchema } from '../offer/model';

//--------------------------------------------------------------//
//   Brands Schema                                              //
//--------------------------------------------------------------//

export const brands = {
  name: {
    type: String,
    required: [true, 'Brand name required!']
  },
  image: {
    type: String,
  },
  model: {
    type: String
  },
  offers: [ offerSchema ],
  status: {
    type: String, 
    enum: STATUS,
    required: [true, 'Brand status required!']
  },
};

export const brandSchema = new Schema(brands, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
});

brandSchema.methods = {
  view(fields) {
    const view = {};
    switch(fields) {
      case 'offers':
        view.offers = this.offers;
      break;
      default:
        view.id = this.id;        
        view.name = this.name;
        view.image = this.image;
        view.model = this.model;
        view.offers = this.offers;
        view.status = this.status;
        view.createdAt = this.createdAt;
        view.updatedAt = this.updatedA;
    }
    return view;
  }
};

const model = mongoose.model('Brand', brandSchema)

export const schema = model.schema
export default model
