import { Router } from "express";
import Todo from "../models/todo.model.js";
import validateSession from "../middleware/validate-session.js";

const router = Router();

// Added validate Session which will allow us to connect the new todo to the user who created it.
router.post("/", validateSession, async (req, res) => {
  try {
    const { todo } = req.body;
    const myTodo = new Todo({
      todo,
      owner_id: req.user._id,
    });
    const newTodo = await myTodo.save();
    res.status(200).json({
      message: `${newTodo.todo} added to list`,
      newTodo,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const allTodos = await Todo.find();
    allTodos
      ? res.status(200).json({
          message: "success",
          allTodos,
        })
      : res.status(404).json({
          message: "no todos",
        });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

export default router;
