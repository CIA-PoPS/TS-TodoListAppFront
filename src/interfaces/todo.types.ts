import { TodoTypes } from "../shared/todos";

export namespace TodosApiFunctions {
  export type saveTodo = (newTodo: TodoTypes.TodoDTO | null) => void;
  export type updateTodo = (
    todoData: TodoTypes.TodoDTO | null,
    index: number
  ) => void;
}

export interface ITodosAPI {
  saveTodo: TodosApiFunctions.saveTodo;
  updateTodo: TodosApiFunctions.updateTodo;
}
