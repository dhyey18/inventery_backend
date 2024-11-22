import User from "../models/user.model.js";
import Product from "../models/product.model.js";
import Transaction from "../models/transaction.model.js";

const GST_RATE = 0.18;

const processRental = async (req, res) => {
  try {
    const { userId, rentalDuration } = req.body;
    console.log("Received rental request:", { userId, rentalDuration });

    const user = await User.findById(userId).populate("assignedProduct");
    const product = user.assignedProduct;

    if (!product || user.purchaseStatus) {
      console.log("Error: Product not assigned or already purchased.");
      return res
        .status(400)
        .json({ error: "Product is not assigned or already purchased." });
    }

    const rentalAmount = product.rentalPrice * rentalDuration;
    const gstAmount = rentalAmount * GST_RATE;
    const totalAmount = rentalAmount + gstAmount;

    console.log("Rental details:", { rentalAmount, gstAmount, totalAmount });

    const transaction = new Transaction({
      user: userId,
      product: product._id,
      rentalAmount,
      gstAmount,
      totalAmount,
      transactionType: "rental",
    });

    await transaction.save();

    console.log("Rental transaction saved:", transaction);

    res.status(200).json({ totalAmount, transaction });
  } catch (err) {
    console.log("Error processing rental:", err.message);
    res.status(400).json({ error: err.message });
  }
};

const processPurchase = async (req, res) => {
  try {
    const { userId, productId } = req.body;
    console.log("Received purchase request:", { userId, productId });

    const user = await User.findById(userId);
    const product = await Product.findById(productId);

    user.assignedProduct = productId;
    user.purchaseStatus = true; // Mark as purchased
    await user.save();

    console.log("User updated with purchased product:", user);

    const transaction = new Transaction({
      user: userId,
      product: productId,
      transactionType: "purchase",
      rentalAmount: 0,
      gstAmount: 0,
      totalAmount: 0,
    });

    await transaction.save();

    console.log("Purchase transaction saved:", transaction);

    res
      .status(200)
      .json({ message: "Product purchased successfully", transaction });
  } catch (err) {
    console.log("Error processing purchase:", err.message);
    res.status(400).json({ error: err.message });
  }
};

async function listTransaction(req, res) {
  try {
    console.log("Fetching all transactions");

    const transactions = await Transaction.find({});
    console.log(`Found ${transactions.length} transactions`);

    res.status(200).json(transactions);
  } catch (err) {
    console.log("Error listing transactions:", err.message);
    res.status(500).json({ error: err.message });
  }
}

export { processRental, processPurchase, listTransaction };
