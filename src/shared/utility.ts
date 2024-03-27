import { TodoTypes } from "./todos";

export type VoidTrigger = () => void;
export type onChangeTextAreaEvent = React.ChangeEvent<HTMLTextAreaElement>;
export interface ITodosAPI {
  saveTodo: (newTodo: TodoTypes.TodoDTO | null) => void;
  createTodo: () => void;
}
