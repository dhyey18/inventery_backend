import Product from "../models/product.model.js";
import User from "../models/user.model.js";

async function addProduct(req, res) {
  try {
    console.log("Received product addition request:", req.body);

    const product = new Product(req.body);
    await product.save();

    console.log("Product added successfully:", product);

    res.status(201).json(product);
  } catch (err) {
    console.log("Error adding product:", err.message);
    res.status(400).json({ error: err.message });
  }
}
async function assignProductToUser(req, res) {
  try {
    const { productId, userId } = req.body;
    console.log("Assigning product to user:", { productId, userId });

    const user = await User.findById(userId);

    if (!user) {
      console.log("Error: User not found");
      return res.status(404).json({ error: "User not found" });
    }

    if (user.assignedProduct) {
      console.log("Error: User already has a product assigned.");
      return res
        .status(400)
        .json({ error: "User already has a product assigned." });
    }

    user.assignedProduct = productId;
    await user.save();

    console.log("Product assigned to user:", user);

    res.status(200).json(user);
  } catch (err) {
    console.log("Error assigning product to user:", err.message);
    res.status(400).json({ error: err.message });
  }
}

async function getAllInventory(req, res) {
  try {
    console.log("Fetching all products from inventory");

    const products = await Product.find({});
    console.log(`Found ${products.length} products in the inventory`);

    res.status(200).json(products);
  } catch (err) {
    console.log("Error fetching inventory:", err.message);
    res.status(500).json({ error: err.message });
  }
}

async function generateBill(req, res) {
  const { userId, transactionType, rentalDuration, productId } = req.body;

  try {
    console.log("Generating bill for:", {
      userId,
      transactionType,
      rentalDuration,
      productId,
    });

    // Fetch the user and product from the database
    const user = await User.findById(userId);
    const product = await Product.findById(productId);

    if (!user || !product) {
      console.log("Error: User or product not found");
      return res.status(404).json({ error: "User or product not found" });
    }

    let billDetails = {
      rentalAmount: 0,
      gstAmount: 0,
      totalAmount: 0,
      message: "",
    };

    if (transactionType === "rental") {
      // Rental Billing Logic
      const rentalPricePerDay = product.rentalPrice;
      billDetails.rentalAmount = rentalPricePerDay * rentalDuration;

      // GST Calculation (18%)
      billDetails.gstAmount = billDetails.rentalAmount * 0.18;

      // Total Bill Calculation
      billDetails.totalAmount =
        billDetails.rentalAmount + billDetails.gstAmount;
      billDetails.message = `Total rental cost: ₹${billDetails.rentalAmount}, GST (18%): ₹${billDetails.gstAmount}, Total Bill: ₹${billDetails.totalAmount}`;

      console.log("Rental bill details:", billDetails);
    } else if (transactionType === "purchase") {
      // Purchase Billing Logic
      billDetails.rentalAmount = 0;
      billDetails.gstAmount = 0;
      billDetails.totalAmount = 0;
      billDetails.message =
        "No rental charges. Product purchased successfully. Bill: ₹0";

      console.log("Purchase bill details:", billDetails);
    }

    // Respond with bill details
    res.status(200).json({
      billDetails,
      transactionType,
    });
  } catch (error) {
    console.log("Error generating bill:", error.message);
    res.status(400).json({ error: error.message });
  }
}

export { addProduct, assignProductToUser, getAllInventory, generateBill };
