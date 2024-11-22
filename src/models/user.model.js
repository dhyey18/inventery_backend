import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  assignedProduct: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  rentalDuration: { type: Number, default: 0 }, // Duration in days for rental
  purchaseStatus: { type: Boolean, default: false }, // True if purchased
});

export default mongoose.model("User", userSchema);
