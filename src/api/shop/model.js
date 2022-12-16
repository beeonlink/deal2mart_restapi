import mongoose, { Schema } from "mongoose";

import { phoneValidation, emailValidation, shopValidation, pincodeValidation } from '../../services/constant/function';
import { SHOP_ROLES, SHOP_CATEGORY, STATUS } from "../../services/constant/options";
import { offerSchema } from '../offer/model';
import { comboSchema } from '../combo/model';

//--------------------------------------------------------------//
//   Info Schema                                                //
//--------------------------------------------------------------//

export const info = {  
  phone: {
    type: String,
    // validate: phoneValidation(),
    required: [true, 'Shop phone number required!']
  },
  email: {
    type: String,
    validate: emailValidation(),
    required: [true, 'Shop email required!']
  } 
}

const infoSchema = new Schema( info );

//--------------------------------------------------------------//
//   Address Schema                                             //
//--------------------------------------------------------------//

export const address = {
  door: {
    type: String,
    required: [true, 'Shop door required!']
  },
  street: {
    type: String,
    required: [true, 'Shop street required!']
  },
  city: {
    type: String,
    required: [true, 'Shop city required!']
  },
  state: {
    type: String,
    required: [true, 'Shop state required!']
  },
  country: {
    type: String,
    required: [true, 'Shop country required!']
  },
  pincode: {
    type: String,
    required: [true, 'Shop pincode required!']
  }  
}

const addressSchema = new Schema( address );

//--------------------------------------------------------------//
//   Review Schema                                              //
//--------------------------------------------------------------//

export const reviews = { 
  name: {
    type: String,
    required: [true, 'Pleaes provide ratings required!']
  },
  review: {
    type: String,
    required: [true, 'Pleaes provide ratings required!']
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    required: [true, 'Pleaes provide ratings required!']
  },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: [true, 'Pleaes provide ratings required!'] }
}

const reviewsSchema = new Schema( reviews );

//--------------------------------------------------------------//
//   Products Schema                                            //
//--------------------------------------------------------------//

export const products = { 
  name: {
    type: String,
    required: [true, 'Product name required!']
  },
  image: {
    type: String,
    required: [true, 'Product image required!']
  },
  gallery: [{
    type: String
  }],    
  sku: {
    type: String
  },    
  label: {
    type: String,
    
  },
  description: {
    type: String
  },
  model: {
    type: String
  },    
  offer: {
    type: Number
  },
  qty: {
    type: Number
  },
  buying_price: {
    type: Number,
    required: [true, 'Product buying price required!']
  },
  selling_price: {
    type: Number,
    required: [true, 'Product selling price required!']
  },
  status: {
    type: String, 
    enum: STATUS,
    required: true
  },    
  brand: { type: Schema.Types.ObjectId, ref: 'Brand' },
  manufactuer: { type: Schema.Types.ObjectId, ref: 'Manufactuer' },
  category: { type: Schema.Types.ObjectId, ref: 'Category', required: [true, 'Create user required!']},
  user: { type: Schema.Types.ObjectId, ref: 'User' , required: [true, 'Create user required!']},
  reviews: [ reviewsSchema ],
}

const productsSchema = new Schema( products,{
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => {
      delete ret._id;
    },
  },
} );

//--------------------------------------------------------------//
//   Orders Schema                                              //
//--------------------------------------------------------------//

export const orderItems = {
  name: {
    type: String,
    required: [true, 'Pleaes provide name required!']
  },
  qty: {
    type: Number,
    required: [true, 'Pleaes provide qty required!']
  },
  price: {
    type: Number,
    required: [true, 'Pleaes provide price required!']
  },
  subtotal: {
    type: Number,
    required: [true, 'Pleaes provide subtotal required!']
  },
}

const orderItemSchema = new Schema(orderItems);

export const orders = { 
  items: [orderItemSchema],
  status: {
    type: String, 
    enum: STATUS,
    required: true
  },
  total: {
    type: Number,
    required: [true, 'Pleaes provide total required!']
  },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: [true, 'Pleaes provide user required!'] }
}

const ordersSchema = new Schema(orders);

//--------------------------------------------------------------//
//   Payments Schema                                            //
//--------------------------------------------------------------//

const paymentsSchema = new Schema();

//--------------------------------------------------------------//
//   Permission Schema                                          //
//--------------------------------------------------------------//

export const allow = {
  read: {
    type: Boolean,
    required: [true, 'Shop read permission required!']
  },
  write: {
    type: Boolean,
    required: [true, 'Shop write permission required!']
  },
  update: {
    type: Boolean,
    required: [true, 'Shop update permission required!']
  },
  delete: {
    type: Boolean,
    required: [true, 'Shop delete permission required!']
  }  
}

const allowSchema = new Schema(allow);

export const permission = {
  status: {
    type: String, 
    enum: STATUS,
    required: [true, 'Shop status required!']
  },
  allow: allowSchema
}

const permissionSchema = new Schema(permission);

//--------------------------------------------------------------//
//   Group Permission Schema                                    //
//--------------------------------------------------------------//

const groupPermissionSchema = new Schema();

//--------------------------------------------------------------//
//   Shop Schema                                                //
//--------------------------------------------------------------//

export const shop = {   
  name: {
    type: String,
    required: [true, 'Shop name required!']
  },
  image: {
    type: String,
  },
  description: {
    type: String,
  },
  role: {
    type: String,
    enum: SHOP_ROLES,
    required: [true, 'Shop role required!']
  },
  category: {
    type: String,
    enum: SHOP_CATEGORY,
    required: [true, 'Shop category required!']
  },
  info: infoSchema,
  address: addressSchema,
  products: [ productsSchema ],
  offers: [ offerSchema ],
  combos: [ comboSchema ],
  reviews: [ reviewsSchema ],
  permission: permissionSchema,
  location: {
    type: {
      type: String, 
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },


  orders: [ ordersSchema ],
  payments: paymentsSchema,  
  group_permission: groupPermissionSchema  
} 

const shopSchema = new Schema( shop,
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


//****************************** Return Columns ******************************/

shopSchema.methods = {  
  view(fields) {
    const view = {};
    switch(fields) {
      case 'info':
        view.info = this.info;
      break;
      case 'address':
        view.address = this.address;
      break;
      case 'products':
        view.products = this.products;
      break;
      case 'reviews':
        view.reviews = this.reviews;
      break;
      case 'orders':
        view.orders = this.orders;
      break;
      case 'payments':
        view.payments = this.payments;
      break;
      case 'permission':
        view.permission = this.permission;
      break;
      case 'group_permission':
        view.group_permission = this.group_permission;
      break;      
      case 'offers':
        view.offers = this.offers;
      break;
      case 'combos':
        view.combos = this.combos;
      break;
      default:
        view._id = this._id;
        view.name = this.name;
        view.image = this.image;
        view.description = this.description;
        view.role = this.role;
        view.category = this.category;
        view.info = this.info;
        view.address = this.address;
        view.products = this.products;
        view.reviews = this.reviews;
        view.orders = this.orders;
        view.payments = this.payments;
        view.permission = this.permission;
        view.location = this.location;
        view.group_permission = this.group_permission;
        view.offers = this.offers;
        view.combos = this.combos;
        view.createdAt = this.createdAt;
        view.updatedAt = this.updatedAt;
    }
    return view;
  }

};

const model = mongoose.model("Shop", shopSchema);

export const schema = model.schema;
export default model;
