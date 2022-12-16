import mongoose, { Schema } from 'mongoose';
import { MEDIA_CATEGORY } from "../../services/constant/options";

const mediaSchema = new Schema({
  name: {
    type: String
  },
  image: {
    type: String
  },
  category: {
    type: String, 
    enum: MEDIA_CATEGORY,
    required: true
  },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: [true, 'User is required!'] }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

mediaSchema.plugin(require('mongoose-keywords'), {paths: ['name', 'category']});

mediaSchema.methods = {
  view (full) {
    const view = {
      id: this.id,
      name: this.name,
      image: this.image,
      category: this.category,
      user: this.user,
      keywords: this.keywords,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Media', mediaSchema)

export const schema = model.schema
export default model
