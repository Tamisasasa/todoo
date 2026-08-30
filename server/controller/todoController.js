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
    const { startDate, endDate, date, start, end } = req.query;

    const queryStart = startDate || start;
    const queryEnd = endDate || end;

    let sql = 'SELECT id, title, completed, DATE_FORMAT(datetodo, "%Y-%m-%d") AS datetodo FROM todos';
    let params = [];

    if (date) {
        sql += ' WHERE datetodo = ?';
        params.push(date);
    } else if (queryStart && queryEnd) {
        sql += ' WHERE datetodo BETWEEN ? AND ?';
        params.push(queryStart, queryEnd);
    }

    db.query(sql, params, (err, result) => {
        if (err) return res.status(500).json({ message: 'Database error' });
        res.json(result);
    })
}