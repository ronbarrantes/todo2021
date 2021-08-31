import { BoardModel, IBoard } from '../models/BoardModel'
class BoardService {
    static async getAll(): Promise<IBoard[]>{
        return await BoardModel.find({}).exec()
    }

    static async getOne(boardId: string): Promise<IBoard>{
        return await BoardModel.findOne({ _id: boardId }).exec()
    }

    static async create(data: IBoard): Promise<IBoard>{
        const todo = new BoardModel(data)
        return todo.save()
    }

    static async update(boardId: string, data: IBoard): Promise<IBoard | null> {
        return await BoardModel.findByIdAndUpdate(boardId, data).exec()
    }

    static async remove(boardId: string): Promise<IBoard | null> {
        return await BoardModel.findByIdAndDelete(boardId).exec()
    }
}

export default BoardService