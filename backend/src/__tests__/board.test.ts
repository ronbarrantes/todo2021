// import { assert } from 'chai'
// import fetch from 'node-fetch'

import { start, stop } from '../lib/server'

describe('Board Routes', () => {
    before(() => start('testing'))
    after(stop)

    describe('POST', () => {
        it('200 create a new board')
    })

    describe('GET', () => {
        it('200 get a board')
    })

    describe('PUT', () => {
        it('200 modify a board')
    })

    describe('DELETE', () => {
        it('200 a board')
    })
})