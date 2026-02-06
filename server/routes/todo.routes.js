const { readTodo, createTodo, updateTodo, deleteTodo } = require("../controllers/todo.controller.js")
const logger = require("../middleware/logger.js")
const protect = require("../middleware/protect.js")

const router = require("express").Router()

router
    .get("/", logger , readTodo)
    .post("/create", logger,createTodo)
    .patch("/modify/:todoId", updateTodo)
    .delete("/remove/:todoId", deleteTodo)

module.exports = router