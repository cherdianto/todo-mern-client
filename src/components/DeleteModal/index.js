import React, { useRef } from 'react'
import { Transition } from 'react-transition-group'

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

function DeleteModal(props) {
    const { show, taskStatus, onDelete, onCancel } = props
    const modalRef = useRef()
    const overlayRef = useRef()
    return (
        <Transition
            nodeRef={modalRef}
            in={show}
            timeout={DURATION}>
            {(state) => (
                <>
                    <div
                        ref={overlayRef}
                        onClick={onCancel}
                        style={{
                            ...overlayDefaultStyle,
                            ...overlayTransitionStyles[state]
                        }}
                        className="fixed z-10 left-0 top-0 bottom-0 right-0 bg-black"
                    />

                    <div ref={modalRef} style={{ ...defaultStyle, ...transitionStyles[state] }}>
                        <div className='bg-white p-4 h-40 w-64 rounded-lg fixed z-10 transform -translate-x-1/2 -translate-y-1/2 shadow-lg' style={{ left: '50%', top: '50%' }}>
                            <div className="flex flex-col h-full justify-between">
                                <section className="flex flex-row justify-between">
                                    <p className="text-darkPurple text-sm subpixel-antialiased tracking-wide font-bold whitespace-normal">
                                        {taskStatus === 'pending' ? 'This task is pending, delete anyway?' : 'Good to go...'}
                                    </p>
                                    <span onClick={onCancel}>X</span>
                                </section>
                                <button className="text-white text-sm tracking-wide font-bold px-4 py-2 rounded-lg bg-red-600" onClick={onDelete}>
                                    {taskStatus === 'pending' ? 'Delete pending task' : 'Delete completed task'}
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </Transition>
    )
}

export default DeleteModal