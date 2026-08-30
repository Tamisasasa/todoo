import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { startOfWeek, endOfWeek, addDays, format } from 'date-fns'
import { useNavigate } from 'react-router-dom'
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

const Weekly = () => {
    const navigate = useNavigate()
    const [currentDate, setCurrentDate] = useState(new Date())
    const [todos, setTodos] = useState([])

    const startDate = startOfWeek(currentDate, { weekStartsOn: 1 })
    const endDate = endOfWeek(currentDate, { weekStartsOn: 1 })
    const weekDays = Array.from({ length: 7 }, (_, i) => addDays(startDate, i))

    const startStr = format(startDate, 'yyyy-MM-dd')
    const endStr = format(endDate, 'yyyy-MM-dd')

    const getTodos = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/api/todos?startDate=${startStr}&endDate=${endStr}`)
            setTodos(response.data)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getTodos()
    }, [startStr, endStr])

    const toggleTodo = async (currentStatus, id) => {
        try {
            const newStatus = currentStatus ? 0 : 1
            await axios.put(`${API_BASE_URL}/api/todos/${id}/toggle`, { completed: newStatus })
            getTodos()
        } catch (err) {
            console.error(err)
        }
    }

    const handlePrevWeek = () => setCurrentDate(addDays(currentDate, -7))
    const handleNextWeek = () => setCurrentDate(addDays(currentDate, 7))

    const handleCardClick = (day) => {
        const formattedDate = format(day, 'yyyy-MM-dd')
        navigate(`/daily?date=${formattedDate}`)
    }

    return (
        <div className='min-h-screen bg-[#FFFAE6] flex flex-col items-center justify-between p-6'>
            <div className='w-full max-w-6xl flex flex-col items-center'>
                <h1 className='text-4xl font-extrabold text-black text-center mb-1'>
                    {format(startDate, 'd')} - {format(endDate, 'd MMMM')}
                </h1>
                <h2 className='text-4xl font-extrabold text-black text-center mb-8'>
                    {format(endDate, 'yyyy')}
                </h2>

                <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full justify-items-center'>
                    {weekDays.map((day) => {
                        const dayFormatted = format(day, 'yyyy-MM-dd')

                        const dayTasks = todos.filter((item) => {
                            if (!item.datetodo) return false
                            const itemDateStr = typeof item.datetodo === 'string' ? item.datetodo.split('T')[0] : ''
                            return itemDateStr === dayFormatted
                        })

                        return (
                            <div 
                                key={day.toString()} 
                                onClick={() => handleCardClick(day)}
                                className='bg-white border-2 border-black rounded-none p-4 w-full max-w-[220px] min-h-[220px] flex flex-col shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] cursor-pointer hover:bg-gray-50 transition'
                            >
                                <h3 className='text-xl font-bold text-center text-black mb-0.5'>
                                    {format(day, 'EEEE')}
                                </h3>
                                <p className='text-xs text-gray-400 text-center mb-4'>
                                    {format(day, 'd MMMM yyyy')}
                                </p>

                                <div className='space-y-2 flex-1'>
                                    {dayTasks.map((item) => (
                                        <div 
                                            key={item.id} 
                                            className='flex items-center gap-2'
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <input
                                                type='checkbox'
                                                checked={Boolean(item.completed)}
                                                onChange={() => toggleTodo(item.completed, item.id)}
                                                className='w-4 h-4 cursor-pointer accent-black'
                                            />
                                            <span className={`text-sm font-medium ${item.completed ? 'line-through text-gray-400' : 'text-black'}`}>
                                                {item.title}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            <div className='flex items-center gap-3 mt-8'>
                <button
                    onClick={handlePrevWeek}
                    className='w-10 h-10 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition'
                >
                    <ChevronLeft size={20} />
                </button>
                <span className='text-xl font-bold'>-</span>
                <button
                    onClick={handleNextWeek}
                    className='w-10 h-10 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition'
                >
                    <ChevronRight size={20} />
                </button>
            </div>
        </div>
    )
}

export default Weekly