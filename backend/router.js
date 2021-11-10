const express = require("express");
const {
  createTodoList,
  getToDoLists,
  updateTodoList,
} = require("./services/todo-list");

const router = express.Router();

router.post("/list", createTodoList);
router.get("/list", getToDoLists);
router.post("/list/:id", updateTodoList);

module.exports = router;
