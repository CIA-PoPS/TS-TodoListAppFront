import { TDElementTypes, TodoElement } from "./TodoElement";
import NoTodoCard from "../static/NoTodo";

import "./TodosContainer.css";
import { useMemo } from "react";

type TodosContainerProps = {
  todos: TDElementTypes.Type[];
  createTodoCallback: TDElementTypes.creationCallback;
};

const TodosContainer: React.FC<TodosContainerProps> = (props) => {
  const newTodo = useMemo(
    () => props.todos.filter((value) => value === null),
    [props.todos]
  );

  const visibleTodos = useMemo(
    () => props.todos.filter((value) => value !== null),
    [props.todos]
  );

  return (
    <div className="TodoContainer">
      {newTodo.length > 0 && (
        <TodoElement
          todo={null}
          creation={props.createTodoCallback}
          key={"newTodo"}
        ></TodoElement>
      )}
      {visibleTodos.length > 0 &&
        visibleTodos.map((td, index) => {
          return (
            <TodoElement
              todo={td}
              creation={props.createTodoCallback}
              key={index}
            ></TodoElement>
          );
        })}
      {props.todos.length === 0 && <NoTodoCard />}
    </div>
  );
};

export default TodosContainer;
