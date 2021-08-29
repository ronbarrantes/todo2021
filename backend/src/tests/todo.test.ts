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
        it('Should create a todo', async () => {
            const task = makeRandomWords(3)

            const fetched = await fetch(`${apiUrl}/add`, {
                method: 'POST',
                body: JSON.stringify({ task }),
                headers: { 'Content-Type': 'application/json' },
            })

            const response: ITodo = await fetched.json()
            assert.deepEqual(fetched.status, 200, 'Not OK')
            assert.exists(response, 'Did not create a test')
            assert.deepEqual({ task: response.task }, { task }, 'Tasks do not match')
        })

        it('should fail creating a post with an empty task', async () => {
            const fetched = await fetch(`${apiUrl}/add`, {
                method: 'POST',
                body: JSON.stringify({}),
                headers: { 'Content-Type': 'application/json' },
            })

            assert.notDeepEqual(fetched.status, 200)
        })
    })

    describe('GET', () => {
        it('200 get all 5 todos', async () => {
            const numOfTodos = 5
            await mocks.createMany(numOfTodos)
            const fetched = await fetch(apiUrl)
            const data: ITodo[] = await fetched.json()

            assert.deepEqual(fetched.status, 200, 'Not OK')
            assert.deepEqual(data.length, numOfTodos, `Should have created ${numOfTodos} todos`)
        })

        // it.skip('404 fetches the wrong api', async () => {
        //     const fetched = await fetch(apiUrl)
        //     assert.deepEqual(fetched.status, 404, 'Did not find the api')
        // })
    })

    // describe('PUT')
    // describe('DELETE')
})