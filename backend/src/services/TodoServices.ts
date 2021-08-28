import { TodoModel as Todo } from '../models/TodoModel'
import { ITodo } from '../routes/todo'
import { Document } from 'mongoose'

class TodoServices {
// get all
    // static async getAll(data: Partial<ITodo>):Promise<Document>{}

    static async create(data: Partial<ITodo>): Promise<Document>{
        const todo = new Todo(data)
        return todo.save()
    }

    // static async update(data: Partial<ITodo>):Promise<Document>{}
    // static async remove(data: Partial<ITodo>):Promise<Document>{}

// delete

}

export default TodoServices