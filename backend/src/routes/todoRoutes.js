import express from "express";
import {
  createTodo,
  deleteTodo,
  getTodo,
  getTodos,
  updateTodo,
} from "../controllers/todo/todoController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/todo/create", protect, createTodo);
router.get("/todos", protect, getTodos);
router.get("/todo/:id", protect, getTodo);
router.patch("/todo/:id", protect, updateTodo);
router.delete("/todo/:id", protect, deleteTodo);

export default router;
