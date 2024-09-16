import asyncHandler from "express-async-handler";
import TodoModel from "../../models/todos/TodoModel.js";

export const createTodo = asyncHandler(async (req, res) => {
  try {
    const { title, description, dueDate, priority, status } = req.body;

    if (!title || title.trim() === "") {
      res.status(400).json({ message: "Title Is Required..." });
    }

    const todo = new TodoModel({
      title,
      description,
      dueDate,
      priority,
      status,
      user: req.user._id,
    });

    await todo.save();

    res.status(201).json(todo);
  } catch (error) {
    console.log("Error In Creating Todo: ", error.message);
    res.status(500).json({ message: error.message });
  }
});

export const getTodos = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;
    if (!userId) {
      res.status(400).json({ message: "User Not Found" });
    }
    const todos = await TodoModel.find({ user: userId });
    res.status(200).json({
      length: todos.length,
      todos,
    });
  } catch (error) {
    console.log("Error In Getting Todo: ", error.message);
    res.status(500).json({ message: error.message });
  }
});

export const getTodo = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;
    const { id } = req.params;

    if (!id) {
      res.status(400).json({ message: "Please Provide A TODO ID" });
    }

    const todo = await TodoModel.findById(id);

    if (!todo) {
      res.status(404).json({ message: "TODO Not Found" });
    }

    if (!todo.user.equals(userId)) {
      res.status(401).json({ message: "Not Authorized To View This TODO" });
    }

    res.status(200).json(todo);
  } catch (error) {
    console.log("Error In Getting Todo: ", error.message);
    res.status(500).json({ message: error.message });
  }
});

export const updateTodo = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;

    const { id } = req.params;
    const { title, description, dueDate, priority, status, completed } =
      req.body;

    if (!id) {
      res.status(400).json({ message: "Please provide a TODO ID" });
    }

    const todo = await TodoModel.findById(id);

    if (!todo) {
      res.status(404).json({ message: "TODO not found!" });
    }

    if (!todo.user.equals(userId)) {
      res.status(401).json({ message: "Not authorized..." });
    }

    todo.title = title || todo.title;
    todo.description = description || todo.description;
    todo.dueDate = dueDate || todo.dueDate;
    todo.priority = priority || todo.priority;
    todo.status = status || todo.status;
    todo.completed = completed || todo.completed;

    await todo.save();

    return res.status(200).json(todo);
  } catch (error) {
    console.log("Error in Update Todo: ", error.message);
    res.status(500).json({ message: error.message });
  }
});

export const deleteTodo = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;
    const { id } = req.params;

    const todo = await TodoModel.findById(id);

    if (!todo) {
      res.status(404).json({ message: "TODO Not Found!" });
    }

    if (!todo.user.equals(userId)) {
      res.status(401).json({ message: "Not authorized!" });
    }

    await TodoModel.findByIdAndDelete(id);

    return res.status(200).json({ message: "TODO Deleted Successfully!" });
  } catch (error) {
    console.log("Error in Deleting TODO: ", error.message);
    res.status(500).json({ message: error.message });
  }
});

export const deleteAllTodos = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;

    const todos = await TodoModel.find({ user: userId });

    if (!todos) {
      res.status(404).json({ message: "No TODOs found!" });
    }

    if (!todos.user.equals(userId)) {
      res.status(401).json({ message: "Not authorized!" });
    }

    await TodoModel.deleteMany({ user: userId });

    return res.status(200).json({ message: "All TODOs Deleted Successfully!" });
  } catch (error) {
    console.log("Error in Deleting TODOs: ", error.message);
    res.status(500).json({ message: error.message });
  }
});
