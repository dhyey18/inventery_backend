import express from "express";

const router = express.Router();
import {
  createUser,
  getAllUser,
  unAssignInventery,
} from "../controllers/user.controller.js";

router.post("/create", createUser);
router.post("/unAssign", unAssignInventery);
router.get("/allUser", getAllUser);

export default router;
