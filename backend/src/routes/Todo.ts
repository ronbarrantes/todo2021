import { Router, Request, Response } from 'express'
import { setTask } from '../utils'

export interface ITodo {
    id: string;
    task: string;
    completed?: boolean;
    createdAt?: number;
    modifiedAt?: number
}

const state: Map<string, ITodo> = new Map()

const Todo = Router()
    .get('/todos', (_req: Request, res: Response) => {
        return res.json([...state].map((val) => val[1]))
    })

    .post('/todos/add', (req: Request, res: Response) => {
        const currTask = <ITodo>req.body
        if(!currTask.task){
            return res.send('missing task')
        }

        const newTask = setTask(currTask)
        state.set(newTask.id, newTask)
        return res.json(newTask)
    })

    .put('/todos/update/:todoId', (req: Request, res: Response) => {
        const id = req.params.todoId
        const body = <ITodo>req.body

        if(id.length === 0 || !id)
        // return res.send('please provide id')
            throw new Error('No Id provided')

        if(!state.has(id))
            throw new Error('ID does not exist')

        const item = state.get(id)
        const task = body.task || item?.task
        const completed = body.completed || item?.completed

        const newTask = setTask({ ...item, task, completed })
        state.set(id, newTask)
        res.json(newTask)
    })

    .delete('/todos/remove/:todoId', (req: Request, res: Response) => {
        const id = req.params.todoId

        if(id.length === 0 || !id){
            res.send('No Id provided')
            throw new Error('No Id provided')
        }
        // return res.send('please provide id')

        if(!state.has(id)){
            res.send('No Id provided')
            throw new Error('ID does not exist')
        }

        state.delete(id)
        res.send({ message: 'todo deleted' })
    })

// MAYBE HAVE ONE FOR COMPLETED

export default Todo