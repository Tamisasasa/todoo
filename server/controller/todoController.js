const db = require('../config/db')

exports.postTodo = (req, res) => {
    const { title, datetodo } = req.body;
    
    const today = datetodo || new Date().toISOString().slice(0, 10);

    db.query('INSERT INTO todos (title, datetodo) VALUES (?, ?)', [title, today], (err, result) => {
        if (err) {
            console.log('MYSQL ERROR:', err)
            return res.status(500).json({
                message: 'Database error'
            })
        }
        res.json(result)
    })
}
// exports.getTodo = (req, res) => {
//     db.query('SELECT * FROM todos', (err, result) => {
//         if (err) {
//             console.log('MYSQL ERROR:', err)
//             return res.status(500).json({
//                 message: 'Database error'
//             })
//         }
//         res.json(result);
//     })
// }

exports.putTodo = (req, res) => {
    const { id } = req.params;
    const { title } = req.body;

    db.query('UPDATE todos SET title = ? WHERE id = ?', [title, id], (err, result) => {
        if (err) {
            console.log('MYSQL ERROR:', err)
            return res.status(500).json({
                message: 'Database error'
            })
        }
        res.json(result);
    })
}


exports.deleteTodo = (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM todos WHERE id = ?', [id], (err, result) => {
        if (err) {
            console.log('MYSQL ERROR:', err)
            return res.status(500).json({
                message: 'Database error'
            })
        }
        res.json({
            message: 'Todo deleted successfully'
        });
    })
}

exports.toggleTodo = (req, res) => {
    const { id } = req.params;
    const { completed } = req.body
    db.query(
        'UPDATE todos SET completed = ? WHERE id = ?',
        [completed, id],
        (err, result) => {

            if (err) {
                console.log('MYSQL ERROR:', err)

                return res.status(500).json({
                    message: 'Database error'
                })
            }

            res.json(result)
        }
    )
}

exports.getTodo = (req, res) => {
    const { start, end, date } = req.query;

    let sql = 'SELECT * FROM todos';
    let params = [];

    if (date) {
        sql += ' WHERE datetodo = ?';
        params.push(date);
    } else if (start && end) {
        sql += ' WHERE datetodo BETWEEN ? AND ?';
        params.push(start, end);
    }

    db.query(sql, params, (err, result) => {
        if (err) return res.status(500).json({ message: 'Database error' });
        res.json(result);
    })
}