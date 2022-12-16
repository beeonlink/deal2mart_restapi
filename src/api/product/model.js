import mongoose, { Schema, SchemaType, SchemaTypes } from 'mongoose';
import * as Shop from "../shop/model";

export const productSchema = new Schema({  
  name: {
    type: String
  },
  image: {
    type: String
  },
  offer: {
    type: Number
  },
  label: {
    type: String
  },
  description: {
    type: String
  },
  sku: {
    type: String
  },
  category: {
    type: String
  },
  brand: {
    type: String
  },
  manufactuer: {
    type: String
  },
  purchase_rate: {
    type: Number
  },
  retail_rate: {
    type: Number
  },
  qty: {
    type: Number
  },
  shop: [{ type: Schema.Types.ObjectId, ref: 'Shop' }],
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

productSchema.methods = {
  view(full) {
    const view = {
      // simple view
      id: this.id,      
      name: this.name,
      image: this.image,
      offer: this.offer,
      label: this.label,
      description: this.description,
      sku: this.sku,
      category: this.category,
      brand: this.brand,
      manufactuer: this.manufactuer,
      purchase_rate: this.purchase_rate,
      retail_rate: this.retail_rate,
      qty: this.qty,
      shop: this.shop,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Product', productSchema);

export const schema = model.schema;
export default model;
