import React, { useRef } from 'react'
import { Transition } from 'react-transition-group'
import { useForm } from 'react-hook-form'

const DURATION = 300

const defaultStyle = {
    transition: `all ${DURATION}ms ease-in-out`,
    opacity: 0,
    display: 'none',
    left: '50%',
    top: '50%'
}

const overlayDefaultStyle = {
    transition: `all ${DURATION}ms ease-in-out, opacity ${DURATION * 2}ms ease-in-out`,
    opacity: 0,
    display: 'none',
}

const transitionStyles = {
    unmounted: { opacity: 0, display: 'none' },
    entering: { opacity: 1, display: 'block' },
    entered: { opacity: 1, display: 'block' },
    exiting: { opacity: 0, display: 'none' },
    exited: { opacity: 0, display: 'none' },
}

const overlayTransitionStyles = {
    unmounted: { opacity: 0, bottom: '-180px' },
    entering: { opacity: .85, display: 'block' },
    entered: { opacity: .85, display: 'block' },
    exiting: { opacity: 0, bottom: '-180px' },
    exited: { opacity: 0, bottom: '-180px' },
}

function EditModal(props) {
    const { register, handleSubmit, formState: { errors }, reset } = useForm()
    const { show, taskStatus, taskTitle, taskId, onCancel, onUpdate } = props
    const modalRef = useRef()
    const overlayRef = useRef()

    const onSubmit = async (data) => {
        try {
            // console.log('updating', taskStatus, taskTitle, taskId)
            // console.log(data)
            onUpdate(data)
            
        } catch (error) {
            throw new Error(error)
        }
    }

    const onClose = () => {
        reset()
        onCancel()
    }

    // alert('tes')
    return (
        <Transition
            nodeRef={modalRef}
            in={show}
            timeout={DURATION}>
            {(state) => (
                <>
                    <div
                        ref={overlayRef}
                        onClick={onClose}
                        style={{
                            ...overlayDefaultStyle,
                            ...overlayTransitionStyles[state]
                        }}
                        className="fixed z-10 left-0 top-0 bottom-0 right-0 bg-black"
                    />

                    <div ref={modalRef} style={{ ...defaultStyle, ...transitionStyles[state] }}>
                        <div className='bg-white p-4 h-40 w-100 rounded-lg fixed z-10 transform -translate-x-1/2 -translate-y-1/2 shadow-lg' style={{ left: '50%', top: '50%' }}>
                            {/* <div className="flex flex-col h-full justify-between"> */}
                            <form
                                onSubmit={handleSubmit(onSubmit)}
                            >
                                <div className='bg-white p-4 h-40 w-64 rounded-lg fixed z-10 transform -translate-x-1/2 -translate-y-1/2 shadow-lg' style={{ left: '50%', top: '50%' }}>
                                    <div className="flex flex-col h-full justify-between">
                                        <section className="flex flex-row justify-between">
                                            <input
                                                defaultValue={taskTitle}
                                                name='title'
                                                type='text'
                                                className="text-darkPurple text-sm subpixel-antialiased tracking-wide font-bold whitespace-normal"
                                                {...register("title", { required: true, min: 8, max: 30 })}

                                            />
                                            <span onClick={onClose}>X</span>
                                        </section>
                                        <button 
                                            type='submit'
                                            className="text-white text-sm tracking-wide font-bold px-4 py-2 rounded-lg bg-red-600">
                                            save update
                                        </button>
                                    </div>
                                </div>
                            </form>
                            {/* </div> */}
                        </div>
                    </div>
                </>
            )}
        </Transition>
    )
}

export default EditModal