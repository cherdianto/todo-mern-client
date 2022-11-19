import axios from 'axios'

const baseUrl = process.env.REACT_APP_API_URL
// const baseUrl = 'https://apitodo.cherdianto.site'
const DELETE_TODO = `${baseUrl}/api/delete-todo`
const GET_TODO = `${baseUrl}/api/todo`
const GET_TODOS = `${baseUrl}/api/todos`
const POST_TODO = `${baseUrl}/api/add-todo`
const UPDATE_TODO = `${baseUrl}/api/update-todo`

// SEPERATION OF CONCERN : SETIAP FUNCTION HANYA MELAKUKAN 1 FUNGSI/TUGAS
// MAKA DISINI DIPISAH ANTARA POST DAN GET. SO, TIDAK ADA RESPONSE DARI AXIOS.POST
export const deleteTodo = async (id) => {
    try {
        await axios.delete(`${DELETE_TODO}/${id}`)
    } catch (error) {
        throw new Error(error)
    }
}



export const getTodo = async (id) => {
    try {
        const response = await axios.get(`${GET_TODO}/${id}`)
        // console.log(response.data)
        return response.data
    } catch (error) {
        throw new Error(error)
    }
}


export const getTodos = async () => {
    try {
        const response = await axios.get(GET_TODOS)
        // console.log(response)
        return response.data
    } catch (error) {
        throw new Error(error)
    }
}


// SEPERATION OF CONCERN : SETIAP FUNCTION HANYA MELAKUKAN 1 FUNGSI/TUGAS
// MAKA DISINI DIPISAH ANTARA POST DAN GET. SO, TIDAK ADA RESPONSE DARI AXIOS.POST
export const postTodo = async (data) => {
    try {
        await axios.post(POST_TODO, data)
    } catch (error) {
        throw new Error(error)
    }
}


// THIS SERVICE WILL ONLY CHANGE THE STATUS OF TODO, SWITCHING FROM DONE TO PENDING OR PENDING TO DONE
export const updateTodo = async (id) => {
    // get the data from server
    const getTodoResponse = await getTodo(id)
    // console.log(getTodoResponse)

    if(getTodoResponse){
        const title = getTodoResponse.title
        const status = getTodoResponse.status === 'pending' ? 'done' : 'pending'
        
        try {
            await axios.put(`${UPDATE_TODO}/${id}`, {
                title,
                status
            })
        } catch (error) {
            throw new Error(error)
        }
    }
}