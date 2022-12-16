import mongoose, { Schema } from "mongoose";
import { STATUS } from "../../services/constant/options";

var categorySchema = new Schema({
    name: {
      type: String,
      required: [true, 'Category name required!']
    },
    image: {
      type: String,
      required: [true, 'Category image required!']
    },
    description: {
      type: String,
    },
    offer: {
      type: Number,
    },
    status: {
      type: String,
      enum: STATUS,
      required: [true, 'Category status required!']
    },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: [true, 'Category name required!'] },
    parent: [{
      type: String,
    }]
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (obj, ret) => {
        delete ret._id;
      },
    },
  }
);


categorySchema.methods = {
  view(full) {
    const view = {
      // simple view
      id: this.id,
      name: this.name,
      image: this.image,
      description: this.description,
      offer: this.offer,
      status: this.status,
      user: this.user,
      parent: this.parent,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };

    return full
      ? {
          ...view,
          // add properties for a full view
        }
      : view;
  },
};

const model = mongoose.model("Category", categorySchema);

export const schema = model.schema;
export default model;
