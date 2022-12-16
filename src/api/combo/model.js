import mongoose, { Schema } from 'mongoose'

//--------------------------------------------------------------//
//   Combo Schema                                               //
//--------------------------------------------------------------//

export const combo =  {
  title: {
    type: String
  },
  image: {
    type: String
  },
  price: {
    type: String
  },
  status: {
    type: String
  },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  products: [{ type: Schema.Types.ObjectId, ref: 'Product' }]
}

export const comboSchema = new Schema(combo)

comboSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      title: this.title,
      image: this.image,
      price: this.price,
      status: this.status,
      user: this.user,
      products: this.products,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Combo', comboSchema)

export const schema = model.schema
export default model
