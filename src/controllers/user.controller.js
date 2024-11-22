import User from "../models/user.model.js";

async function createUser(req, res) {
  try {
    const {
      name,
      assignedProduct,
      rentalDuration,
      purchaseStatus = false,
    } = req.body;

    console.log("Received user creation request:", req.body);

    const user = new User({
      name,
      assignedProduct,
      rentalDuration,
      purchaseStatus,
    });

    await user.save();

    console.log("User created successfully:", user);

    res.status(201).json(user);
  } catch (err) {
    console.log("Error creating user:", err.message);
    res.status(400).json({ error: err.message });
  }
}

async function unAssignInventery(req, res) {
  try {
    const { userId } = req.body;

    console.log("Unassigning inventory from user:", userId);

    const user = await User.findById(userId);

    if (!user) {
      console.log("Error: User not found");
      return res.status(404).json({ error: "User not found" });
    }

    // Unassign product after rental duration
    user.assignedProduct = null;
    user.rentalDuration = 0; // Reset rental duration
    await user.save();

    console.log("Inventory unassigned successfully from user:", userId);

    res.status(200).json({ message: "Inventory unassigned successfully" });
  } catch (error) {
    console.log("Error unassigning inventory:", error.message);
    res.status(400).json({ error: error.message });
  }
}

async function getAllUser(req, res) {
  try {
    console.log("Fetching all users");

    const users = await User.find({});
    console.log(`Found ${users.length} users`);

    res.status(200).json(users);
  } catch (error) {
    console.log("Error fetching users:", error.message);
    res.status(500).json({ error: error.message });
  }
}

export { createUser, unAssignInventery, getAllUser };
