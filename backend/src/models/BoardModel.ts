import * as mongoose from 'mongoose'
export interface IBoard {
    name: string;
    _id?: string;
}

const BoardSchema = new mongoose.Schema<IBoard>({
    name: { type: String, require: true, trim: true },
})

export const BoardModel = mongoose.model('Board', BoardSchema)