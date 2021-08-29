import { TodoModel as Todo, ITodo } from '../models/TodoModel'
import { Document } from 'mongoose'

class TodoServices {
// get all
    // static async getAll(data: Partial<ITodo>):Promise<Document>{}

    static async getAll(): Promise<Document[]>{
        return Todo.find({}).exec()
    }

    static async create(data: ITodo): Promise<Document>{
        const todo = new Todo(data)
        return todo.save()
    }

    // static async update(todoId: string, data: ITodo): Promise<> {
    //     const todo = TodoModel.findByIdAndUpdate(todoId, data)
    //     return todo
    // }

    // static async remove(todoId){}

    // static async update(data: Partial<ITodo>):Promise<Document>{}
    // static async remove(data: Partial<ITodo>):Promise<Document>{}

// delete

}

export default TodoServices