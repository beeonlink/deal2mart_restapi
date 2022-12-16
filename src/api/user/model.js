import crypto from 'crypto'
import bcrypt from 'bcrypt'
import randtoken from 'rand-token'
import mongoose, { Schema, SchemaType } from 'mongoose'
import mongooseKeywords from 'mongoose-keywords'
import { env } from '../../config'
import { USER_ROLE, LANGUAGE, CURRENCY, TIME, STATUS, NOTIFICATION_TYPES } from '../../services/constant/options';

//--------------------------------------------------------------//
//   Profile Schema                                             //
//--------------------------------------------------------------//

export const profile = {
  name: {
    type: String,
    required: [true, 'User profile full name required!'],
  },
  phone: {
    type: String,
    required: [true, 'User profile phone required!'],
    minlength: 10
  },
  door: {
    type: String,
    required: [true, 'User profile door required!']
  },
  street: {
    type: String,
    required: [true, 'User profile street required!']
  },
  area: {
    type: String,
    required: [true, 'User profile area required!']
  },
  city: {
    type: String,
    required: [true, 'User profile city required!']
  },
  state: {
    type: String,
    required: [true, 'User profile state required!']
  },
  country: {
    type: String,
    required: [true, 'User profile country required!']
  },
  shop: { type: Schema.Types.ObjectId, ref: 'Shop' }
}

const profileSchema = new Schema(profile);

//--------------------------------------------------------------//
//   Wishlist Schema                                            //
//--------------------------------------------------------------//

export const wishlist = {
  products:[{ type: Schema.Types.ObjectId, ref: 'Product' }],
  shops:[{ type: Schema.Types.ObjectId, ref: 'Shop' }]
}

const wishlistSchema = new Schema(wishlist);

//--------------------------------------------------------------//
//   Preference Schema                                          //
//--------------------------------------------------------------//

export const preference = {
  language: {
    type: String,
    enum: LANGUAGE,
    default: LANGUAGE[0],
    required: [true, 'User preference language required!']
  },
  currency: {
    type: String,
    enum: CURRENCY,
    default: CURRENCY[0],
    required: [true, 'User preference currency required!']
  },
  time: {
    type: String,
    enum: TIME,
    default: TIME[0],
    required: [true, 'User preference time required!']
  },
}

const preferenceSchema = new Schema(preference);

//--------------------------------------------------------------//
//   Permission Schema                                          //
//--------------------------------------------------------------//

export const allow = {
  read: {
    type: Boolean,
    required: [true, 'User read permission required!']
  },
  write: {
    type: Boolean,
    required: [true, 'User write permission required!']
  },
  update: {
    type: Boolean,
    required: [true, 'User update permission required!']
  },
  delete: {
    type: Boolean,
    required: [true, 'User delete permission required!']
  }  
}

const allowSchema = new Schema(allow);

export const permission = {
  status: {
    type: String, 
    enum: STATUS,
    required: [true, 'User status required!']
  },
  allow: allowSchema
}

const permissionSchema = new Schema(permission);

//--------------------------------------------------------------//
//   Notification Schema                                        //
//--------------------------------------------------------------//

export const notification = {
  type: {
    type: String,
    enum: NOTIFICATION_TYPES,
    default: NOTIFICATION_TYPES[0],
    required: [true, 'User notification type required!']
  },
  // template: { type: Schema.Types.ObjectId, ref: 'MessageTemplate' },
}

const notificationSchema = new Schema(notification);

//--------------------------------------------------------------//
//   Location Schema                                            //
//--------------------------------------------------------------//

export const location = {
  type: {
    type: String, 
    enum: ['Point'],
    required: [true, 'User location type required!']
  },
  coordinates: {
    type: [Number],
    required: [true, 'User location coordinates required!']
  }
}

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
//   User Schema                                                //
//--------------------------------------------------------------//

export const user = {
  username: {
    type: String,
    index: true,
    trim: true
  }, 
  email: {
    type: String,
    match: /^\S+@\S+\.\S+$/,
    unique: true,
    trim: true,
    lowercase: true,
    required: [true, 'User email required!']
  },
  password: {
    type: String,    
    minlength: 6,
    required: [true, 'User password required!']
  },  
  services: {
    facebook: String,
    github: String,
    google: String
  },
  role: {
    type: String,
    enum: USER_ROLE,
    default: USER_ROLE[0],
    required: [true, 'User role required!']
  },
  profile: profileSchema,
  preference: preferenceSchema,
  permission: permissionSchema,
  wishlist: wishlistSchema,    
  location: location,
  reviews: [ reviewsSchema ],

  notification: notificationSchema,
  
  // group_permission: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
  // offer: { type: Schema.Types.ObjectId, ref: 'Product' },
  // group: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
  
}

const userSchema = new Schema(user, {
  timestamps: true
})

userSchema.path('email').set(function (email) {
  if (!this.picture || this.picture.indexOf('https://gravatar.com') === 0) {
    const hash = crypto.createHash('md5').update(email).digest('hex')
    this.picture = `https://gravatar.com/avatar/${hash}?d=identicon`
  }

  if (!this.username) {
    this.username = email.replace(/^(.+)@.+$/, '$1')
  }

  return email
})

userSchema.pre('save', function (next) {
  if (!this.isModified('password')) return next()

  /* istanbul ignore next */
  const rounds = env === 'test' ? 1 : 9

  bcrypt.hash(this.password, rounds).then((hash) => {
    this.password = hash
    next()
  }).catch(next)
})

userSchema.methods = {
  view (full) {
    const view = {}
    let fields = ['id', 'username', 'email', 'picture'];
    if (full) {
      fields = [...fields,  'createdAt', 'wishlist', 'favshop', 'profile', 'preference', 'permission', 'notification', 'location']
    }
    fields.forEach((field) => { view[field] = this[field] });
    return view
  },
  authenticate (password) {
    return bcrypt.compare(password, this.password).then((valid) => valid ? this : false)
  }
}

userSchema.statics = {
  USER_ROLE,
  createFromService ({ service, id, email, username, picture }) {
    return this.findOne({ $or: [{ [`services.${service}`]: id }, { email }] }).then((user) => {
      if (user) {
        user.services[service] = id
        user.username = username
        user.email = email
        user.picture = picture
        return user.save()
      } else {
        const password = randtoken.generate(16)
        return this.create({ services: { [service]: id }, email, password, username, picture })
      }
    });
  }
}

userSchema.plugin(mongooseKeywords, { paths: ['email', 'username'] });
const model = mongoose.model('User', userSchema);

export const schema = model.schema;
export default model;
