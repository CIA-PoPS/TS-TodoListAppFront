import { TodoElement } from "./TodoElement";
import NoTodoCard from "../static/NoTodo";

import "./TodosContainer.css";
import { SimpleTodo, TodoTypes } from "../shared/todos";

type TodosContainerProps = {
  todos: TodoTypes.TodoDTO[];
  create: boolean;
  creationCallback: (data: TodoTypes.TodoDTO | null) => void;
};

const TodosContainer: React.FC<TodosContainerProps> = (props) => {
  return (
    <div className="TodoContainer">
      {props.create ? (
        <TodoElement
          params={{ callback: props.creationCallback }}
          key={"creation_td"}
        />
      ) : (
        <></>
      )}
      {props.todos.length > 0 ? (
        props.todos.map((td, index) => {
          return (
            <TodoElement
              params={{ todo: SimpleTodo.fromDTO(td) }}
              key={index}
            ></TodoElement>
          );
        })
      ) : (
        <></>
      )}
      {props.todos.length === 0 && !props.create ? <NoTodoCard /> : <></>}
    </div>
  );
};

export default TodosContainer;
