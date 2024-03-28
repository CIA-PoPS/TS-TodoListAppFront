import { TodosApiFunctions } from "../../interfaces/todo.types";
import { TodoTypes } from "../../shared/todos";

export type Type = TodoTypes.ITodos | null;

export type TodoElementProps = {
  todo: Type;
  creation: TodosApiFunctions.saveTodo;
  todoIndex: number | null;
};
