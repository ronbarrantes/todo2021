import * as mongoose from 'mongoose'
export interface ITodo {
    task: string;
    completed?: boolean;
    createdAt?: number;
    modifiedAt?: number;
    _id?: string;
}

export const TodoSchema = new mongoose.Schema<ITodo>({
    task:{ type: String, unique: false, trim: true },
    completed:{ type: Boolean, default: false },
    createdAt:{ type: Number, default: () => Date.now() },
    modifiedAt:{ type: Number, default: () => Date.now() },
})

export const TodoModel = mongoose.model('Todo', TodoSchema)