import NoTodoCard from "../static/NoTodo";
import { useMemo } from "react";
import { ITodosAPI } from "../interfaces/todo.types";
import { TodoCreation } from "./todos/TodoCreation";
import { TodoDisplay } from "./todos/TodoDisplay";
import { Type as TDType } from "./todos/common";

import "./TodosContainer.css";

type TodosContainerProps = {
  todos: TDType[];
  api: ITodosAPI;
};

const TodosContainer: React.FC<TodosContainerProps> = (props) => {
  const newTodo = useMemo(
    () => props.todos.filter((value) => value === null),
    [props.todos]
  );

  return (
    <div className="TodoContainer">
      {newTodo.length > 0 && (
        <TodoCreation
          on_create={props.api.saveTodo}
          key={"newTodo"}
        ></TodoCreation>
      )}
      {props.todos.length > 0 &&
        props.todos.map((td, index) => {
          if (td === null) return <></>;
          return (
            <TodoDisplay todo={td} key={index} todo_index={index} updateTodo={props.api.updateTodo}></TodoDisplay>
          );
        })}
      {props.todos.length === 0 && <NoTodoCard />}
    </div>
  );
};

export default TodosContainer;
