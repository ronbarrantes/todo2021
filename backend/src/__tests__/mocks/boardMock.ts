import { makeRandomWords } from './utils'
import BoardService from '../../services/BoardService'
import { IBoard, BoardModel } from '../../models/BoardModel'

type Create = (text?: string) => Promise<IBoard>
type CreateMany = (num?: number) => Promise<IBoard[]>

export const create: Create = async (text) => {
    text = text || makeRandomWords()
    return await BoardService.create({ name: text })
}

export const createMany: CreateMany = async (num = 5) => {
    return await Promise.all(new Array(num).fill({}).map(async () => await create()))
}

export const remove = async (): Promise<void> => BoardModel.deleteMany({})