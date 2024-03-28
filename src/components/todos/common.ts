import { TodoTypes } from "../../shared/todos";

export type creationCallback = (data: TodoTypes.TodoDTO | null) => void;
export type Type = TodoTypes.ITodos | null;

export type TodoElementProps = {
  todo: Type;
  creation: creationCallback;
  todoIndex: number | null;
};
