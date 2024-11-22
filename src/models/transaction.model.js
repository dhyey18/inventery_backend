import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  rentalAmount: { type: Number, default: 0 },
  gstAmount: { type: Number, default: 0 },
  totalAmount: { type: Number, default: 0 },
  transactionType: {
    type: String,
    enum: ["purchase", "rental"],
    required: true,
  },
  transactionDate: { type: Date, default: Date.now },
});

export default mongoose.model("Transaction", transactionSchema);
