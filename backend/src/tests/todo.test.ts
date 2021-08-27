
import { assert } from 'chai'
import fetch from 'node-fetch'
import { lorem } from 'faker'

import { start, stop } from '../lib/server'
import { ITodo } from '../routes/todo'

const url = 'http://localhost:3000/todos'

type MakeNewTodo = (task: string) => Promise<ITodo>

const makeNewTodo: MakeNewTodo = async (task) => {
    const fetched = await fetch(`${url}/add`, {
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

            let allTodos: ITodo[] = await (await fetch(`${url}`)).json()
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
            const message2 = await (await fetch(`${url}/remove/${task2.id}`, { method: 'DELETE' })).json()
            console.log('MESSAGE', message2)

            allTodos = await (await fetch(`${url}`)).json()
            let todoExist = false

            for(const todo of allTodos){
                if(todo.id === task2.id){
                    todoExist = true
                    break
                }
            }

            assert.isNotTrue(todoExist, 'todo should have been deleted')
        })
    })
})