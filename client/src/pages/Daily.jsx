import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Plus, Trash2, Pencil } from 'lucide-react'
import { useSearchParams } from 'react-router-dom'
import { format } from 'date-fns'
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://gracious-liberation-production-662c.up.railway.app'

const Daily = () => {
    const [searchParams] = useSearchParams()
    const dateParam = searchParams.get('date') || format(new Date(), 'yyyy-MM-dd')

    const [todos, setTodos] = useState([])
    const [add, setAdd] = useState('')

    const getTodo = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/api/todos?date=${dateParam}`)
            setTodos(response.data)
        } catch (error) {
            console.error(error)
            setTodos([])
        }
    }

    const addTodo = async () => {
        if (!add.trim()) return
        try {
            await axios.post(`${API_BASE_URL}/api/todos`, { title: add, datetodo: dateParam })
            setAdd('')
            getTodo()
        } catch (err) {
            console.error(err)
        }
    }

    const editTodo = async (id, currentTitle) => {
        const newTodo = prompt('Edit your todo:', currentTitle)
        if (!newTodo || !newTodo.trim()) return
        try {
            await axios.put(`${API_BASE_URL}/api/todos/${id}`, { title: newTodo })
            getTodo()
        } catch (err) {
            console.error(err)
        }
    }

    const deleteTodo = async (id) => {
        try {
            await axios.delete(`${API_BASE_URL}/api/todos/${id}`)
            getTodo()
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        getTodo()
    }, [dateParam])

    const toggleTodo = async (currentStatus, id) => {
        try {
            const newStatus = currentStatus ? 0 : 1
            await axios.put(`${API_BASE_URL}/api/todos/${id}/toggle`, { completed: newStatus })
            getTodo()
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <div className='min-h-screen bg-[#FFFAE6] flex items-center justify-center p-4'>
            <div className='bg-[#ffffff] p-6 rounded-xl shadow-md w-full max-w-md border border-black'>
                <h1 className='text-2xl font-bold text-gray-800 mb-1 text-center'>My Todo</h1>
                <p className='text-xs text-gray-400 text-center mb-4'>
                    {format(new Date(dateParam), 'EEEE d MMMM yyyy')}
                </p>

                <div className='flex gap-2 mb-4'>
                    <input
                        type='text'
                        placeholder='write ur to do'
                        value={add}
                        onChange={(e) => setAdd(e.target.value)}
                        className='flex-1 border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500'
                    />
                    <button
                        onClick={addTodo}
                        className='bg-black text-[#FFFAE6] px-4 py-2 rounded-lg flex items-center gap-1 font-medium transition'
                    >
                        <Plus size={18} /> add
                    </button>
                </div>

                <div className='space-y-2'>
                    {todos.map((item) => (
                        <div key={item.id} className='flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition'>
                            <div className='flex items-center gap-3 overflow-hidden'>
                                <input
                                    type="checkbox"
                                    checked={Boolean(item.completed)}
                                    onChange={() => toggleTodo(item.completed, item.id)}
                                    className='w-4 h-4 text-blue-600 rounded cursor-pointer'
                                />
                                <span className={`text-gray-700 truncate ${item.completed ? 'line-through text-gray-400' : ''}`}>
                                    {item.title}
                                </span>
                            </div>

                            <div className='flex items-center gap-1'>
                                <button
                                    onClick={() => editTodo(item.id, item.title)}
                                    className='p-1.5 text-gray-500 hover:text-blue-500 hover:bg-blue-50 rounded-md transition'
                                >
                                    <Pencil size={18} />
                                </button>
                                <button
                                    onClick={() => deleteTodo(item.id)}
                                    className='p-1.5 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-md transition'
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Daily