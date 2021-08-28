import * as mongoose from 'mongoose'
export interface ITodo {
    task: string;
    completed?: boolean;
    createdAt?: number;
    modifiedAt?: number;
}

// TODO: cleanup
export const TodoSchema = new mongoose.Schema<ITodo>({
    // id:{ type: String, unique: true, required: true},
    task:{ type: String, unique: false, trim: true },
    completed:{ type: Boolean, default: false },
    createdAt:{ type: Number, default: () => Date.now() },
    modifiedAt:{ type: Number, default: () => Date.now() },
    // group: { type: String, default: 'Reminders', trim: true },
})

export const TodoModel = mongoose.model('Todo', TodoSchema)