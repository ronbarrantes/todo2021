import { makeRandomWords } from './utils'
import TodoServices from '../../services/TodoServices'
import { Document } from 'mongoose'
import { TodoModel } from '../../models/TodoModel'

type Create = (text?: string) => Promise<Document>
type CreateMany = (num?: number) => Promise<Document[]>

export const create: Create = async (text) => {
    text = text || makeRandomWords()
    return await TodoServices.create({ task: text })
}

export const createMany: CreateMany = async (num = 5) => {
    const result = await Promise.all(new Array(num).fill({}).map(async () => await create()))
    console.log(result)
    return result
}

export const remove = async (): Promise<void> => TodoModel.deleteMany({})