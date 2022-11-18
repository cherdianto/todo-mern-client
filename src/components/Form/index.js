import React, { useRef, useEffect } from 'react'
import { Transition } from 'react-transition-group'
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from 'react-query'
import { postTodo } from '../../api'

const DURATION = 300

const defaultStyle = {
  transition: `bottom ${DURATION}ms ease-in-out, opacity ${DURATION}ms ease-in-out`,
  opacity: 0,
  bottom: '-180px'
}

const transitionStyles = {
  unmounted: { bottom: '-180px', opacity: 0 },
  entering: { opacity: 1, bottom: 0 },
  entered: { opacity: 1, bottom: 0 },
  exiting: { opacity: 0, bottom: '-180px' },
  exited: { opacity: 0, bottom: '-180px' },
}

const overlayDefaultStyle = {
    transition: `all ${DURATION}ms ease-in-out, opacity ${DURATION * 2}ms ease-in-out`,
    opacity: 0,
    display: 'none',
}

const overlayTransitionStyles = {
    unmounted: { opacity: 0, bottom: '-180px' },
    entering: { opacity: .85, display: 'block' },
    entered: { opacity: .85, display: 'block' },
    exiting: { opacity: 0, bottom: '-180px' },
    exited: { opacity: 0, bottom: '-180px' },
}

function Form(props) {
  const { show, onClose } = props
  const { register, handleSubmit, formState: {errors}, reset } = useForm()


  const formRef = useRef()
  const overlayRef = useRef()

  const onSubmit = async (data) => {
    try {
      await addTodo.mutate(data)
      reset()
      
    } catch (error) {
      throw new Error(error)
    }
  }

  const handleOnClose = () => {
    reset()
    onClose()
  }

  const cache = useQueryClient()

  const addTodo = useMutation(postTodo, {
    onSuccess: () => {
      cache.invalidateQueries('todos')
    }
  })

  return (
    <Transition
      nodeRef={formRef}
      in={show}
      timeout={DURATION}>
      {(state) => (
        <>
          <div
            ref={overlayRef}
            onClick={handleOnClose}
            style={{
                ...overlayDefaultStyle,
                ...overlayTransitionStyles[state]
            }}
            className="fixed z-10 left-0 top-0 bottom-0 right-0 bg-black"
          />
          <div ref={formRef} style={{ ...defaultStyle, ...transitionStyles[state] }}>
            <div className='fixed flex flex-col z-10 inset-x-0 rounded-t-lg p-4 h-40 bg-white shadow-xl'>
              <form 
                className="flex justify-center items-center bg-gray-200 px-4 py-2 rounded-lg box-border"
                onSubmit={handleSubmit(onSubmit)}>
                <input
                  autoFocus={show}
                  type="text"
                  name='title'
                  placeholder='Kasih makan burung'
                  className="text-darkPurple flex-1 bg-transparent outline-none" 
                  {...register("title", { required: true, min: 8, max: 30})}
                  />
                <input 
                  {...register("status")}
                  type="text"  
                  name='status' 
                  defaultValue='pending' 
                  className="hidden" />
                <input 
                  type="submit" 
                  value='Add' 
                  className="bg-transparent outline-none text-md font-bold text-darkPurple ml-1" 
                  />
              </form>
              <span 
                className="absolute transform -translate-x-1/2 -translate-y-1/2 text-red" 
                style={{ bottom: '20px', left: '50%', color:'red'}}
                onClick={handleOnClose}>Cancel</span>
            </div>
          </div>
        </>
      )}
    </Transition>
  )
}

export default Form