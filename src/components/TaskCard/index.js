import React, { useState } from 'react'
import DeleteModal from '../DeleteModal'
import classnames from 'classnames'
import { useMutation, useQueryClient } from 'react-query'
import { updateTodo, deleteTodo } from '../../api'
import CheckIcon from '../../assets/icon/check'
import DeleteIcon from '../../assets/icon/delete'

function TaskCard({ title, taskId, status }) {
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const cache = useQueryClient()

  const checkTodo = useMutation(updateTodo, {
    onSuccess: () => {
      cache.invalidateQueries('todos')
    }
  })

  const removeTodo = useMutation(deleteTodo, {
    onSuccess: () => {
      cache.invalidateQueries('todos')
    }
  })

  const handleRemoveTodo = (stat) => {
    if(stat === 'delete'){
      removeTodo.mutate(taskId)
      setShowDeleteModal(false)
    }

    if(stat === 'cancel'){
      setShowDeleteModal(false)
    }
  }

  const containerClass = classnames('flex justify-center items-center relative rounded-lg shadow-lg p-4 mb-2 bg-white', {
    'bg-white text-darkPurple' : status === 'pending',
    'bg-gray-300 bg-opacity-50' : status === 'done'
  })

  const titleClass = classnames('flex-1 text-md subpixel-antialiased tracking-wide font-bold whitespace-normal truncate', {
    'line-through': status === 'done'
  })

  return (
    <div className={containerClass}>
        <p className={titleClass}>
            {title}
        </p>
        <div className="flex text-darkPurple gap-2">
            {/* <span>Check</span>  */}
            <span onClick={() => checkTodo.mutate(taskId)}><CheckIcon size='24' color={status === 'pending' ? 'green' : 'black'} background='transparent'/></span> 
            <span onClick={() => setShowDeleteModal(true)}><DeleteIcon size='24' color={status === 'pending' ? 'red' : 'black'} background='transparent' /></span>
        </div>

        <DeleteModal 
          show= {showDeleteModal}
          taskStatus={status}
          onDelete={() => handleRemoveTodo('delete')}
          onCancel={() => handleRemoveTodo('cancel')}
        />
    </div>
  )
}

export default TaskCard