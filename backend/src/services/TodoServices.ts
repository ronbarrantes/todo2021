import { TodoModel as Todo, ITodo } from '../models/TodoModel'
class TodoServices {
    static async getAll(): Promise<ITodo[]>{
        return await Todo.find({}).exec()
    }

    static async create(data: ITodo): Promise<ITodo>{
        const todo = new Todo(data)
        return todo.save()
    }

    static async update(todoId: string, data: ITodo): Promise<ITodo | null> {
        data.modifiedAt = Date.now()
        const todo = await Todo.findByIdAndUpdate(todoId, data).exec()
        return todo
    }

    // static async remove(todoId){}

    // static async update(data: Partial<ITodo>):Promise<Document>{}
    // static async remove(data: Partial<ITodo>):Promise<Document>{}

// delete

}

export default TodoServices