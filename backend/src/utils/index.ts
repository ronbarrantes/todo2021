import { nanoid } from 'nanoid'
import { ITodo } from '../routes/Todo'

export const setTask = (payload: ITodo): ITodo => {
    const { id, createdAt, completed, task } = payload
    const currDate = Date.now()
    return {
        id: id || nanoid(8),
        createdAt: createdAt || currDate,
        modifiedAt: currDate,
        completed: completed || false,
        task,
    }
}