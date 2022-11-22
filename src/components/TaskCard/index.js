import React, { useState } from 'react'
import DeleteModal from '../DeleteModal'
import classnames from 'classnames'
import { useMutation, useQueryClient } from 'react-query'
import { updateStatusTodo, updateTitleTodo, deleteTodo } from '../../api'
import CheckIcon from '../../assets/icon/check'
import DeleteIcon from '../../assets/icon/delete'
import EditIcon from '../../assets/icon/edit'
import EditModal from '../EditModal'

function TaskCard({ title, taskId, status }) {
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)

  const cache = useQueryClient()

  const checkTodo = useMutation(updateStatusTodo, {
    onSuccess: () => {
      cache.invalidateQueries('todos')
    }
  })

  const removeTodo = useMutation(deleteTodo, {
    onSuccess: () => {
      cache.invalidateQueries('todos')
    }
  })

  const editTodo = useMutation(updateTitleTodo, {
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

  const handleEditTodo = (stat) => {
    if(stat === 'cancel'){
      setShowEditModal(false)
    }
  }

  const handleUpdateTodo = async (data) => {
    data.id = taskId
    try {
      await editTodo.mutate(data)
    } catch (error) {
      throw new Error(error)
    }
    setShowEditModal(false)
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
        <div className="flex text-darkPurple gap-1">
            {/* <span>Check</span>  */}
            <span onClick={() => setShowEditModal(true)}><EditIcon size='22' color={status === 'pending' ? 'brown' : 'black'} background='transparent'/></span> 
            <span onClick={() => checkTodo.mutate(taskId)}><CheckIcon size='22' color={status === 'pending' ? 'green' : 'black'} background='transparent'/></span> 
            <span onClick={() => setShowDeleteModal(true)}><DeleteIcon size='22' color={status === 'pending' ? 'red' : 'black'} background='transparent' /></span>
        </div>

        <DeleteModal 
          show= {showDeleteModal}
          taskStatus={status}
          onDelete={() => handleRemoveTodo('delete')}
          onCancel={() => handleRemoveTodo('cancel')}
        />

        <EditModal
          show={showEditModal}
          taskStatus={status}
          taskTitle={title}
          taskId={taskId} 
          onUpdate={(data) => handleUpdateTodo(data)}
          onCancel={() => handleEditTodo('cancel')}
          />
    </div>
  )
}

export default TaskCard