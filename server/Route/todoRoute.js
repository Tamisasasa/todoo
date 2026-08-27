const express = require('express')
const router = express.Router()
const {postTodo, getTodo , toggleTodo ,putTodo , deleteTodo} = require('../controller/todoController')

// //Create
router.post('/todos', postTodo)

//Read
router.get('/todos', getTodo)

// //Update
router.put('/todos/:id', putTodo)

// //Delete
router.delete('/todos/:id', deleteTodo)

router.put('/todos/:id/toggle', toggleTodo)


module.exports = router ;