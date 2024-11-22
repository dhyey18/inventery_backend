import express from "express";
import inventoryRouter from "./routers/inventory.routes.js";
import transactionRouter from "./routers/transaction.routes.js";
import userRouter from "./routers/user.routes.js";
import cors from "cors";

const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/inventory", inventoryRouter);
app.use("/api/transaction", transactionRouter);
app.use("/api/user", userRouter);

export default app;
