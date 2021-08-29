import { makeRandomWords } from './utils'
import TodoServices from '../../services/TodoServices'
import { Document } from 'mongoose'

type Create = (text?: string) => Promise<Document>
type CreateMany = (num?: number) => Promise<Document[]>

// TODO: mockOne
export const create: Create = async (text) => {
    text = text || makeRandomWords()

    console.log('TEXT ==>', text)
    return await TodoServices.create({ task: text })
}

// TODO: mockMany
export const createMany: CreateMany = async (num = 5) => {
    const result = await Promise.all(new Array(num).map(async () => await create()))
    return result
}

// TODO: mockRemove