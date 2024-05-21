import express from "express";
import { validateOrder } from "../middleware/validate.js";
import {
  verifyJWT,
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} from "../middleware/verifyJWT.js";
import {
  createOrder,
  deleteOrder,
  getAllOrders,
  getUserOrders,
  updateOrder,
} from "../controllers/orderControllers.js";
const router = express.Router();

router.post("/", verifyJWT, validateOrder, createOrder);
router.put("/:id", verifyTokenAndAdmin, validateOrder, updateOrder);
router.delete("/:id", verifyTokenAndAdmin, deleteOrder);
router.get("/", verifyTokenAndAdmin, getAllOrders);
router.get("/:userId", verifyTokenAndAuthorization, getUserOrders);

export default router;
