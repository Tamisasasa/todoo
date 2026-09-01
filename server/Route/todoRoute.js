const express = require('express')

const {
    getTodo,
    postTodo,
    putTodo,
    toggleTodo,
    deleteTodo,
    deleteCompleted
} = require('../controller/todoController')

const router = express.Router()


router.get('/todos', getTodo)

router.post('/todos', postTodo)

router.put('/todos/:id', putTodo)

router.put('/todos/:id/toggle', toggleTodo)

router.delete('/todos/:id', deleteTodo)

router.delete('/todos/completed', deleteCompleted)


module.exports = router