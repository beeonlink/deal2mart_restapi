import mongoose, { Schema } from 'mongoose'


const allowSchema = new Schema({
  read: {
    type: Boolean,
    required: true,
  },
  write: {
    type: Boolean,
    required: false,
  },
  update: {
    type: Boolean,
    required: false,
  },
  delete: {
    type: Boolean,
    required: false,
  }  
});


const permissionSchema = new Schema({
  status: {
    type: String
  },
  allow: allowSchema
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

permissionSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      status: this.status,
      allow: this.allow,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Permission', permissionSchema)

export const schema = model.schema
export default model
