const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var orderSchema = new mongoose.Schema(
  {
    products: [
      {
        product: { type: mongoose.Types.ObjectId, ref: "Product" },
        count: Number,
        color: String,
      },
    ],
    status: {
      type: string,
      default: "Processing",
      enum: ["Cancelled", "Processing", "Successed"],
    },
    paymentIntent: {},
    orderBy: {
      type: mongoose.Types.ObjectId,
      ref: "Product",
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

//Export the model
module.exports = mongoose.model("Order", orderSchema);
