import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rentalPrice: { type: Number, required: true },
  purchasePrice: { type: Number, required: true },
});

export default mongoose.model("Product", productSchema);
