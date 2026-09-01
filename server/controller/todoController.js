const db = require('../config/db')


// GET TODOS
exports.getTodo = (req, res) => {

    const sql = `
        SELECT *
        FROM todos
        ORDER BY id DESC
    `

    db.query(sql, (err, result) => {

        if (err) {
            console.error('MYSQL ERROR:', err)

            return res.status(500).json({
                message: 'Database error'
            })
        }

        res.json(result)
    })
}


// CREATE TODO
exports.postTodo = (req, res) => {

    const { title } = req.body

    if (!title || title.trim() === '') {
        return res.status(400).json({
            message: 'Title is required'
        })
    }

    const sql = `
        INSERT INTO todos (title, completed)
        VALUES (?, false)
    `

    db.query(sql, [title.trim()], (err, result) => {

        if (err) {
            console.error('MYSQL ERROR:', err)

            return res.status(500).json({
                message: 'Database error'
            })
        }

        res.status(201).json({
            id: result.insertId,
            title: title.trim(),
            completed: false
        })
    })
}


// UPDATE TODO
exports.putTodo = (req, res) => {

    const { id } = req.params
    const { title } = req.body

    if (!title || title.trim() === '') {
        return res.status(400).json({
            message: 'Title is required'
        })
    }

    const sql = `
        UPDATE todos
        SET title = ?
        WHERE id = ?
    `

    db.query(
        sql,
        [title.trim(), id],
        (err, result) => {

            if (err) {
                console.error('MYSQL ERROR:', err)

                return res.status(500).json({
                    message: 'Database error'
                })
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    message: 'Todo not found'
                })
            }

            res.json({
                message: 'Todo updated'
            })
        }
    )
}


// TOGGLE TODO
exports.toggleTodo = (req, res) => {

    const { id } = req.params

    const sql = `
        UPDATE todos
        SET completed = NOT completed
        WHERE id = ?
    `

    db.query(sql, [id], (err, result) => {

        if (err) {
            console.error('MYSQL ERROR:', err)

            return res.status(500).json({
                message: 'Database error'
            })
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: 'Todo not found'
            })
        }

        res.json({
            message: 'Todo status changed'
        })
    })
}


// DELETE TODO
exports.deleteTodo = (req, res) => {

    const { id } = req.params

    const sql = `
        DELETE FROM todos
        WHERE id = ?
    `

    db.query(sql, [id], (err, result) => {

        if (err) {
            console.error('MYSQL ERROR:', err)

            return res.status(500).json({
                message: 'Database error'
            })
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: 'Todo not found'
            })
        }

        res.json({
            message: 'Todo deleted'
        })
    })
}


// DELETE COMPLETED
exports.deleteCompleted = (req, res) => {

    const sql = `
        DELETE FROM todos
        WHERE completed = true
    `

    db.query(sql, (err) => {

        if (err) {
            console.error('MYSQL ERROR:', err)

            return res.status(500).json({
                message: 'Database error'
            })
        }

        res.json({
            message: 'Completed todos deleted'
        })
    })
}