import React from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import { Plus, Trash2, Pencil } from 'lucide-react'

const index = () => {

    const [todos, setTodos] = useState([]);
    const [add, setAdd] = useState('');

    const getTodo = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/todos')
            console.log(response.data)
            setTodos(response.data)
        } catch (error) {
            console.error(error)
        }
    }

    const addTodo = async () => {
        if (!add.trim()) return;
        try {
            await axios.post('http://localhost:8000/api/todos', { title: add })
            setAdd('')
            getTodo();
        } catch (err) {
            console.error(err)
        }
    }

    const editTodo = async (id , currentTitle) => {;
        const newTodo = prompt('Edit your todo:', currentTitle)
        if (!newTodo || !newTodo.trim()) return;
        try {
            await axios.put(`http://localhost:8000/api/todos/${id}`,{title: newTodo})
            getTodo();
        } catch (err) {
            console.error(err)
        }
    }

    const deleteTodo = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/api/todos/${id}`)
            getTodo();
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        getTodo()
    }, [])

    const toggleTodo = async (currentStatus,id) => {
     try {
            const newStatus = currentStatus ? 0 : 1;
            await axios.put(`http://localhost:8000/api/todos/${id}/toggle`, { completed: newStatus })
            getTodo();
        } catch (err) {
            console.error(err)
        }
    }


    return (
        <div>
            <h1>My Todo</h1>
            {/* input */}
            <div>
                <input type='text' placeholder='write ur to do' value={add} onChange={(e) => setAdd(e.target.value)}></input>
                <button onClick={addTodo}>add</button>
            </div>


            {todos.map((item) => (
                <div key={item.id}>
                   <input 
                        type="checkbox" 
                        checked={Boolean(item.completed)} 
                        onChange={() => toggleTodo(item.completed ,item.id)} 
                    />
                    {item.title}
                    <button onClick={() => editTodo(item.id, item.title)}><Pencil /></button>
                    <button onClick={() => deleteTodo(item.id)}><Trash2 /></button>
                </div>

            ))}
        </div>
    )
}

export default index