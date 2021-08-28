import { nanoid } from 'nanoid'
import { ITodo } from '../routes/todo'

export const setTask = (payload: Partial<ITodo>): ITodo => {
    const { id, createdAt, completed, task } = payload
    const currDate = Date.now()

    // TODO: remove the if below
    if(!task || task.length === 0){
        throw new Error('Need a proper task')
    }

    return {
        id: id || nanoid(8),
        createdAt: createdAt || currDate,
        modifiedAt: currDate,
        completed: completed || false,
        task,
    }
}