import mongoose from "mongoose";

// create user schema

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    photo: {
      url: {
        type: String,
      },
      public_id: {
        type: String,
      },
    },
    role: {
      type: String,
      default: "user",
    },
    status: {
      type: Boolean,
      default: true,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    trash: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// export user schema

export default mongoose.models.User || mongoose.model("User", userSchema);
