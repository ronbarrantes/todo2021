import { assert } from 'chai'
import fetch from 'node-fetch'

import { makeRandomWords } from './mocks/utils'
import { start, stop } from '../lib/server'
import { ITodo } from '../models/TodoModel'
import * as mocks from './mocks/todoMock'

const apiUrl = 'http://localhost:3000/todos'

describe('Todo Routes', () => {
    before(() => start('testing'))
    after(stop)
    afterEach(mocks.remove)

    describe('POST', () => {
        it('201 Should create a todo', async () => {
            const task = makeRandomWords(3)

            const fetched = await fetch(`${apiUrl}/add`, {
                method: 'POST',
                body: JSON.stringify({ task }),
                headers: { 'Content-Type': 'application/json' },
            })

            const response: ITodo = await fetched.json()
            assert.strictEqual(fetched.status, 201, 'Should have status of 201')
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
            const data: ITodo[] = await fetched.json()

            assert.strictEqual(fetched.status, 200, 'Should have status of 200')
            assert.strictEqual(data.length, numOfTodos, `Should have created ${numOfTodos} todos`)
        })
    })
    describe('PUT', () => {
        it('200 should update a todo', async () => {
            const numOfTodos = 10
            await mocks.createMany(numOfTodos)

            let todos: ITodo[] = await (await fetch(apiUrl)).json()
            const randomTodo = todos[Math.floor(Math.random() * numOfTodos)]

            randomTodo.task = 'Go to sleep'
            randomTodo.completed = true

            const updated = await fetch(`${apiUrl}/update/${randomTodo._id}`, {
                method: 'PUT',
                body: JSON.stringify(randomTodo),
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

        it('200 should test updating task only', async () => {
            const numOfTodos = 10
            await mocks.createMany(numOfTodos)

            let todos: ITodo[] = await (await fetch(apiUrl)).json()
            const randomTodo = todos[Math.floor(Math.random() * numOfTodos)]

            randomTodo.task = 'Go to sleep'

            const updated = await fetch(`${apiUrl}/update/${randomTodo._id}`, {
                method: 'PUT',
                body: JSON.stringify(randomTodo),
                headers: { 'Content-Type': 'application/json' },
            })

            todos = await (await fetch(apiUrl)).json()
            const updatedTodo = todos.filter(todo => todo._id === randomTodo._id)[0]

            assert.strictEqual(updated.status, 200, 'Should have status of 200')
            assert.strictEqual(todos.length, numOfTodos, 'Should have the same number of todos')
            assert.strictEqual(updatedTodo.task, randomTodo.task, `Did not update the todo`)
            assert.notStrictEqual(updatedTodo.modifiedAt, randomTodo.modifiedAt, 'Should have different dates')
        })

        it('200 should test updating completed only', async () => {
            const numOfTodos = 10
            await mocks.createMany(numOfTodos)

            let todos: ITodo[] = await (await fetch(apiUrl)).json()
            const randomTodo = todos[Math.floor(Math.random() * numOfTodos)]

            randomTodo.completed = true

            const updated = await fetch(`${apiUrl}/update/${randomTodo._id}`, {
                method: 'PUT',
                body: JSON.stringify(randomTodo),
                headers: { 'Content-Type': 'application/json' },
            })

            todos = await (await fetch(apiUrl)).json()
            const updatedTodo = todos.filter(todo => todo._id === randomTodo._id)[0]

            assert.strictEqual(updated.status, 200, 'Should have status of 200')
            assert.strictEqual(todos.length, numOfTodos, 'Should have the same number of todos')
            assert.strictEqual(updatedTodo.completed, randomTodo.completed, `Did not update the todo`)
            assert.notStrictEqual(updatedTodo.modifiedAt, randomTodo.modifiedAt, 'Should have different dates')
        })

        it('400 should fail updating a todo due to missing params', async () => {
            const numOfTodos = 10
            await mocks.createMany(numOfTodos)

            const todos: ITodo[] = await (await fetch(apiUrl)).json()
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
            const numOfTodos = 10
            await mocks.createMany(numOfTodos)

            const todos: ITodo[] = await (await fetch(apiUrl)).json()

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
        it(`404 Id not provided`, async () => {
            const numOfTodos = 10
            await mocks.createMany(numOfTodos)

            const updated = await fetch(`${apiUrl}/update`, {
                method: 'PUT',
                body: JSON.stringify({
                    task: 'Fake task',
                }),
                headers: { 'Content-Type': 'application/json' },
            })

            const updatedTodos: ITodo[] = await (await fetch(apiUrl)).json()

            assert.strictEqual(updated.status, 404, 'Should have status of 404')
            assert.strictEqual(updatedTodos.length, numOfTodos, `Should have ${numOfTodos} todos`)
        })
    })
    describe('DELETE', () => {
        it('200 should delete a todo', async () => {
            const numOfTodos = 10
            await mocks.createMany(numOfTodos)

            const todos: ITodo[] = await (await fetch(apiUrl)).json()
            const middleTodo = todos[5]

            const deleted = await fetch(`${apiUrl}/remove/${middleTodo._id}`, { method: 'DELETE' })

            const removedTodos: ITodo[] = await (await fetch(apiUrl)).json()
            const hasDeletedTodo: boolean = removedTodos.map(todo => todo._id).includes(middleTodo._id)

            assert.strictEqual(deleted.status, 200, 'Should have status of 200')
            assert.strictEqual(removedTodos.length, numOfTodos - 1, `Should have ${numOfTodos -1 } todos`)
            assert.isFalse(hasDeletedTodo, 'Todo should not be there')
        })

        it(`404 can't find a todo to delete`, async () => {
            const numOfTodos = 10
            await mocks.createMany(numOfTodos)

            const deleted = await fetch(`${apiUrl}/remove/SuperFakeTodo`, { method: 'DELETE' })
            const updatedTodos: ITodo[] = await (await fetch(apiUrl)).json()

            assert.strictEqual(deleted.status, 404, 'Should have status of 404')
            assert.strictEqual(updatedTodos.length, numOfTodos, `Should have ${numOfTodos} todos`)
        })

        it(`404 Id not provided`, async () => {
            const numOfTodos = 10
            await mocks.createMany(numOfTodos)

            const deleted = await fetch(`${apiUrl}/remove`, { method: 'DELETE' })
            const updatedTodos: ITodo[] = await (await fetch(apiUrl)).json()

            assert.strictEqual(deleted.status, 404, 'Should have status of 404')
            assert.strictEqual(updatedTodos.length, numOfTodos, `Should have ${numOfTodos} todos`)
        })
    })
})