import express from "express";

const router = express.Router();

import {
  addProduct,
  assignProductToUser,
  generateBill,
  getAllInventory,
} from "../controllers/inventory.controller.js";

router.post("/add", addProduct);
router.post("/assign", assignProductToUser);
router.get("/getInventory", getAllInventory);
router.post("/generate-bill", generateBill);

export default router;
