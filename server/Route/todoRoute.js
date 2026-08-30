// Route/todoRoute.js
const express = require('express')
const router = express.Router()
const { postTodo, getTodo, toggleTodo, putTodo, deleteTodo } = require('../controller/todoController')

router.post('/todos', postTodo)
router.get('/todos', getTodo)
router.put('/todos/:id', putTodo)
router.delete('/todos/:id', deleteTodo)
router.put('/todos/:id/toggle', toggleTodo)

module.exports = router