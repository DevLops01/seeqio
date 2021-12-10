const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const options = { timestamps: true, discriminatorKey: "type" };

const userSchema = new mongoose.Schema(
  {
    isAdmin: {
      type: Boolean,
      default: false,
      required: true,
    },

    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      // Validate that email is in standard email address format
      validate(email) {
        if (!validator.isEmail(email)) {
          throw new Error("Email is invalid.");
        }
      },
    },

    firstName: {
      trim: true,
      type: String,
      required: true,
    },

    lastName: {
      trim: true,
      type: String,
      required: true,
    },

    phone: {
      type: String,
    },

    country: {
      type: String,
    },

    stateProvince: {
      trim: true,
      type: String,
    },

    city: {
      trim: true,
      type: String,
    },

    password: {
      type: String,
      min: 8,
      required: true,
    },

    avatar: {
      type: String,
      required: false,
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },

    reviews: [
      {
        creator: {
          type: String,
          required: true,
        },

        comment: {
          type: String,
        },

        rating: {
          type: Number,
          required: true,
        },

        uuid: {
          type: String,
          required: true,
        },
      },
    ],

    proposals: [
      {
        listingTitle: {
          type: String,
          required: true,
        },

        listingId: {
          type: String,
          required: true,
        },

        uuid: {
          type: String,
          required: true,
        },
      },
    ],

    rating: {
      type: Number,
    },

    uuid: {
      type: String,
      required: true,
      unique: true,
    },
  },
  options
);

// Hash password
userSchema.pre("save", async function (next) {
  // If password field has been altered hash it using bcrypt
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8);
  }
});

const User = mongoose.model("user", userSchema);

// Schema that inherits from User
const clientSchema = User.discriminator(
  "client",
  new mongoose.Schema({}, options)
);

const freelancerSchema = User.discriminator(
  "freelancer",
  new mongoose.Schema(
    {
      membership: {
        type: [
          {
            type: String,
            enum: ["basic", "premium"],
          },
        ],
        default: "basic",
        required: true,
      },

      bio: {
        type: String,
        default: "",
      },

      hourlyRate: {
        type: Number,
        required: true,
      },

      connects: {
        type: Number,
        default: 75,
        required: true,
      },
    },
    options
  )
);

module.exports = { User, clientSchema, freelancerSchema };
