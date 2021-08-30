import { assert } from 'chai'
import fetch from 'node-fetch'

import { makeRandomWords } from './mocks/utils'
import { start, stop } from '../lib/server'
import { ITodo, IMongoTodo } from '../models/TodoModel'
import * as mocks from './mocks/todoMock'

const apiUrl = 'http://localhost:3000/todos'

describe('Todo Routes', () => {
    before(() => start('testing'))
    after(stop)
    afterEach(mocks.remove)

    describe('POST', () => {
        it('Should create a todo', async () => {
            const task = makeRandomWords(3)

            const fetched = await fetch(`${apiUrl}/add`, {
                method: 'POST',
                body: JSON.stringify({ task }),
                headers: { 'Content-Type': 'application/json' },
            })

            const response: ITodo = await fetched.json()
            assert.strictEqual(fetched.status, 200, 'Should have status of 200')
            assert.exists(response, 'Should have created a test')
            assert.deepStrictEqual({ task: response.task }, { task }, 'Tasks should match')
        })

        it('400 should fail creating a post with an empty task', async () => {
            const fetched = await fetch(`${apiUrl}/add`, {
                method: 'POST',
                body: JSON.stringify({}),
                headers: { 'Content-Type': 'application/json' },
            })

            assert.strictEqual(fetched.status, 400, 'Should have a status of 400')
        })
    })

    describe('GET', () => {
        it('200 get all 5 todos', async () => {
            const numOfTodos = 5
            await mocks.createMany(numOfTodos)
            const fetched = await fetch(apiUrl)
            const data: IMongoTodo[] = await fetched.json()

            assert.strictEqual(fetched.status, 200, 'Should have status of 200')
            assert.strictEqual(data.length, numOfTodos, `Should have created ${numOfTodos} todos`)
        })
    })

    describe.skip('PUT', () => {
        it('200 should update a todo', async () => {
            const numOfTodos = 10
            await mocks.createMany(numOfTodos)

            let todos: IMongoTodo[] = await (await fetch(apiUrl)).json()
            const randomTodo = todos[Math.floor(Math.random() * numOfTodos)]

            randomTodo.task = 'Go to sleep'
            randomTodo.completed = true

            const updated = await fetch(`${apiUrl}/update/${randomTodo._id}`, {
                method: 'PUT',
                body: JSON.stringify({ randomTodo }),
                headers: { 'Content-Type': 'application/json' },
            })

            todos = await (await fetch(apiUrl)).json()
            const updatedTodo = todos.filter(todo => todo._id === randomTodo._id)[0]

            assert.strictEqual(updated.status, 200, 'Should have status of 200')
            assert.strictEqual(todos.length, numOfTodos, 'Should have the same number of todos')
            assert.deepStrictEqual(
                { task: updatedTodo.task, completed: updatedTodo.completed },
                { task: randomTodo.task, completed: randomTodo.completed },
                `Did not update the todo`)
            assert.notStrictEqual(updatedTodo.modifiedAt, randomTodo.modifiedAt, 'Should have different dates')
        })
        it('400 should fail updating a todo due to missing params', async () => {
            const numOfTodos = 11
            await mocks.createMany(numOfTodos)

            const todos: IMongoTodo[] = await (await fetch(apiUrl)).json()
            const middleTodo = todos[5]

            const updated = await fetch(`${apiUrl}/update/${middleTodo._id}`, {
                method: 'PUT',
                body: JSON.stringify({}),
                headers: { 'Content-Type': 'application/json' },
            })

            assert.strictEqual(updated.status, 400, 'Should have status of 400')
            assert.strictEqual(todos.length, numOfTodos, `Should have made ${numOfTodos} todos`)
        })
        it(`404 can't find a todo that doesn't exist`, async () => {
            const numOfTodos = 11
            await mocks.createMany(numOfTodos)

            const todos: IMongoTodo[] = await (await fetch(apiUrl)).json()

            const updated = await fetch(`${apiUrl}/update/NotARealTodo`, {
                method: 'PUT',
                body: JSON.stringify({
                    task: 'Fake task',
                }),
                headers: { 'Content-Type': 'application/json' },
            })

            assert.strictEqual(updated.status, 404, 'Should have status of 404')
            assert.strictEqual(todos.length, numOfTodos, `Should have made ${numOfTodos} todos`)
        })
    })
    describe('DELETE', () => {
        it('200 should delete a todo')
        it(`404 can't find a todo to delete`)
    })
})