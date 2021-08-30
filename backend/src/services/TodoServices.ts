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

    static async remove(todoId: string): Promise<ITodo | null> {
        const deletedTodo = await Todo.findByIdAndDelete(todoId).exec()
        return deletedTodo
    }

    // TODO: add a completed maybe
}

export default TodoServices