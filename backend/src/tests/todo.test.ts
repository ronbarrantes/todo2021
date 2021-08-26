
import { assert } from 'chai'
import fetch from 'node-fetch'
import { lorem } from 'faker'

import { start, stop } from '../lib/server'
import { ITodo } from '../routes/Todo'

const url = 'http://localhost:3000/todos'

// let state: Map<string, ITodo> = new Map()
type MakeNewTodo = (task: string) => Promise<ITodo>

const makeNewTodo: MakeNewTodo = async (task) => {
    const fetched = await fetch(`${url}/addTodo`, {
        method: 'POST',
        body: JSON.stringify({ task }),
        headers: { 'Content-Type': 'application/json' },
    })
    const response: ITodo = await fetched.json()
    return response
}

const makeRandomWords = (): string => {
    const result = lorem.words(Math.floor(Math.random()* 5) + 1)
    return result
}

describe('Todo Routes', () => {
    before(start)
    after(stop)

    describe('POST & PUT & DELETE', () => {
        it('will test post put and delete', async () => {
            // POST 1
            const message = { task: makeRandomWords() }
            const response = await makeNewTodo(message.task)

            assert.deepStrictEqual(response.task, message.task, 'task does not match'),
            assert.hasAllKeys(response, ['id', 'task', 'createdAt', 'modifiedAt', 'completed'], `it doesn't have all the keys`)

            // POST 2
            await makeNewTodo(makeRandomWords())
            const task2 = await makeNewTodo(makeRandomWords())
            await makeNewTodo(makeRandomWords())

            const allTodos = await (await fetch(`${url}/allTodos`)).json()
            assert.deepStrictEqual(allTodos.length, 4, 'missing some of the todos')

            const updatedTask: Partial<ITodo> = { task: 'Go to sleep', completed: true }

            // UPDATE
            const modified: ITodo = await (await fetch(`${url}/update/${task2.id}`,
                {
                    method: 'PUT',
                    body: JSON.stringify(updatedTask),
                    headers: { 'Content-Type': 'application/json' },
                },
            )).json()

            const { task, completed, modifiedAt, createdAt } = modified
            assert.deepStrictEqual({ task, completed }, { ...updatedTask }, 'did not update')
            assert.notDeepEqual(modifiedAt, createdAt, 'needs to modify the created date')

            // DELETE
            // fetch(`${url}/todos/remove/${task2.id}`, { method: 'DELETE' })

            // assert.notExists()
        })
    })

    describe('PUT', async () => {
        it('will update a todo')
    })
    describe('DELETE', () => {
        it('will delete the todo')
    })
})