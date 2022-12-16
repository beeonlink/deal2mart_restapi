import mongoose, { Schema } from 'mongoose';
import { STATUS } from "../../services/constant/options";

const offerSchema = new Schema({
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
  user: { type: Schema.Types.ObjectId, ref: 'User', required: [true, 'Manufacturer status required!'] }
});

const manufacturerSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Manufacturer name required!']
  },
  image: {
    type: String,
  },
  model: {
    type: String
  },
  offer: [ offerSchema ],
  status: {
    type: String, 
    enum: STATUS,
    required: [true, 'Manufacturer status required!']
  },
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

manufacturerSchema.methods = {
  view (full) {
    const view = {
      id: this.id,
      name: this.name,
      image: this.image,
      model: this.model,
      offer: this.offer,
      status: this.status,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Manufacturer', manufacturerSchema)

export const schema = model.schema
export default model
