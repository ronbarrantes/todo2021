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
    return await Promise.all(new Array(num).fill({}).map(async () => await create()))
}

export const remove = async (): Promise<void> => TodoModel.deleteMany({})