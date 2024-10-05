import mongoose from "mongoose";
import bcrypt from "bcryptjs";


const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    avatar: {
        type: String,
    },
    role: {
        type: String,
        enum: [ 'user', 'admin'],
        default: 'user'
    },
    favoriteProperties: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Property'
        }
    ]
})

// function to hash password
UserSchema.pre("save", async function (next) {
    if (!this.isModified(this.password)) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

// To compare inputed password from the frontend to the one in the database
UserSchema.methods.comparePassword = async function (password) {
    if (!password) throw new Error("Password is missing, can not compare!");

    try {
        const passwordResult = await bcrypt.compare(password, this.password);
        return passwordResult;
    }catch (error) {
        console.log("Error while comparing password", error.message);
    }
}

    // To prevent duplicate email
    UserSchema.statics.isThisEmailInUse = async function (email) {
        if (!email) throw new Error("Invalid Email");
        try {
          const user = await this.findOne({ email });
          if (user) return false;
      
          return true;
        } catch (error) {
          console.log("Error inside isThisEmailInUse method", error.message);
          return false;
        }
      };

UserSchema.virtual("id").get(function () {
    return this._id.toHexString();
  });
  
  UserSchema.set("toJSON", {
    virtuals: true,
  });

const User = mongoose.models.users || mongoose.model('user', UserSchema)


export default User;