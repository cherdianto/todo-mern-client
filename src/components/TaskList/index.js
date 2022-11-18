import React, { useState, useEffect } from 'react'
import classnames from 'classnames'
import TaskCard from '../TaskCard'
import { useQuery } from 'react-query'
import { getTodos } from '../../api'

const filteringValue = {
    'pending': 1,
    'done': 2
}

function TaskList() {
    const { status, data } = useQuery('todos', getTodos)

    const [rawData, setRawData] = useState([])
    const [activeFilter, setActiveFilter] = useState('all')
    const [todoList, setTodoList] = useState([])

    useEffect(() => {
        if (status === 'success') {
            setRawData(data.response)
        }
    }, [status, data])

    useEffect(() => {
        setTodoList(rawData)
        toggleFilter(activeFilter)
    }, [rawData])

    const toggleFilter = (value) => {
        setActiveFilter(value)
        let filterResult = rawData

        if (value !== 'all') {
            filterResult = rawData.filter((item) => item.status === value)
        }
        const sortedFilterResult = filterResult.sort((a, b) => filteringValue[a.status] - filteringValue[b.status])

        setTodoList(sortedFilterResult)
    }

    if (status === 'loading') {
        return <div>Loading data..</div>
    }
    if (status === 'error') {
        return <div>Loading error..</div>
    }

    const filterAllClassname = classnames('rounded-md px-3 py-2', {
        'bg-blue-400': activeFilter === 'all'
    })

    const filterPendingClassname = classnames('rounded-md px-3 py-2', {
        'bg-red-400': activeFilter === 'pending'
    })

    const filterDoneClassname = classnames('rounded-md px-3 py-2', {
        'bg-green-400': activeFilter === 'done'
    })

    return (
        <section className='flex flex-col h-taskList mt-6 pt-5'>
            <nav>
                <ol className="flex flex-row my-2 text-white gap-3 mb-4 align-middle">
                    <li
                        className={filterAllClassname}
                        onClick={() => toggleFilter('all')}>all todos ({data.response.length})</li>
                    <li
                        className={filterPendingClassname}
                        onClick={() => toggleFilter('pending')}>pending ({rawData.filter((item) => item.status === "pending").length})</li>
                    <li
                        className={filterDoneClassname}
                        onClick={() => toggleFilter('done')}>done ({rawData.filter((item) => item.status === "done").length})</li>
                </ol>
            </nav>

            <div className="flex flex-col overflow-x-hidden overflow-y-auto h-taskList">
                {todoList.map((item, id) => (
                    <TaskCard title={item.title} key={item._id} status={item.status} taskId={item._id} />
                ))}
            </div>
        </section>
    )
}

export default TaskList