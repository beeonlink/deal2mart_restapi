import mongoose, { Schema } from 'mongoose'

const cartSchema = new Schema({
  user: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  product: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
  qty: {
    type: Number
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

cartSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      user: this.user,
      product: this.product,
      qty: this.qty,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Cart', cartSchema)

export const schema = model.schema
export default model
