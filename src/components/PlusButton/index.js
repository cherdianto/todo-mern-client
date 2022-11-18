import React from 'react'
import PlusIcon from '../../assets/icon/plus'

function PlusButton(props) {
  const { onClick } = props

  // const cache = useQueryClient()

  // const addTodo = useMutation(postTodo, {
  //   onSuccess: () => {
  //     cache.invalidateQueries('todos')
  //   }
  // })

  // const handleForm = (stat, data) => {
  //   if(stat === 'submit'){
  //     addTodo(data)
  //     setShowForm(false)
  //   }

  //   if(stat === 'cancel'){
  //     setShowForm(false)
  //   }
  // }
  
  return (
    <div 
      className='absolute transform -translate-x-1/2 -translate-y-1/2 text-white font-semibold text-xl' 
      style={{ left: '50%', bottom: '2%'}}
      onClick={onClick}>
        <PlusIcon size='50' background='none' color='white'/>
    </div>
  )
}

export default PlusButton