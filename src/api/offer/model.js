import mongoose, { Schema } from 'mongoose';
import { STATUS } from "../../services/constant/options";

//--------------------------------------------------------------//
//   Offer Schema                                               //
//--------------------------------------------------------------//

export const offer = {
  title: {
    type: String,
    required: [true, 'Offer title required!']
  },
  image: {
    type: String,
    required: [true, 'Offer image required!']
  },
  price: {
    type: Number,
    required: [true, 'Offer price required!']
  },
  status: {
    type: String, 
    enum: STATUS,
    required: [true, 'Offer status required!']
  },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: [true, 'Offer status required!'] }
}

export const offerSchema = new Schema(offer, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

offerSchema.methods = {
  view(fields) {
    const view = {};
    switch(fields) {
      default:
        this.id = this.id;
        this.title = this.title;
        this.image = this.image;
        this.price = this.price;
        this.status = this.status;
        this.shop = this.shop;
        this.user = this.user;
        this.createdAt = this.createdAt;
        this.updatedAt = this.updatedAt;
    }
    return view;
  }
};

const model = mongoose.model('Offer', offerSchema)

export const schema = model.schema
export default model
