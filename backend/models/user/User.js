import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    profilePhoto: {
      type: String,
      default: "https://cdn-icons-png.flaticon.com/512/3177/3177440.png",
    },
    email: {
      type: String,
    },
    bio: {
      type: String,
    },
    password: {
      type: String,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isFollowing: {
      type: Boolean,
      default: false,
    },
    isAccountVerified: {
      type: Boolean,
      default: false,
    },
    accountVerificationToken: String,
    accountVerificationTokenExpires: Date,
    viewedBy: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          reference: "User",
        },
      ],
    },
    followers: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          reference: "User",
        },
      ],
    },
    following: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          reference: "User",
        },
      ],
    },
    passwordChangeAt: Date,
    passwordResetToken: String,
    passwordResetExpire: Date,
    refresh_token: {
      type: String,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
    timestamps: true,
  }
);

userSchema.pre("save", async function (next){
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

userSchema.methods.isPasswordMatched = async function (enteredPassword){
  return await bcrypt.compare(enteredPassword, this.password)
}



export default mongoose.model("User", userSchema);
