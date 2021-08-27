import { ITodo } from '../../routes/Todo'
import fetch from 'node-fetch'
import { lorem } from 'faker'

type MakeNewTodo = (task: string) => Promise<ITodo>

const url = 'http://localhost:3000/todos'

export const makeNewTodo: MakeNewTodo = async (task) => {
    const fetched = await fetch(`${url}/add`, {
        method: 'POST',
        body: JSON.stringify({ task }),
        headers: { 'Content-Type': 'application/json' },
    })
    const response: ITodo = await fetched.json()
    return response
}

export const makeRandomWords = (): string => {
    const result = lorem.words(Math.floor(Math.random()* 5) + 1)
    return result
}