import { TDElementTypes, TodoElement } from "./TodoElement";
import NoTodoCard from "../static/NoTodo";

import "./TodosContainer.css";
import { useMemo } from "react";
import { ITodosAPI } from "../shared/utility";

type TodosContainerProps = {
  todos: TDElementTypes.Type[];
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
        <TodoElement
          todo={null}
          creation={props.api.saveTodo}
          key={"newTodo"}
          todoIndex={null}
        ></TodoElement>
      )}
      {props.todos.length > 0 &&
        props.todos.map((td, index) => {
          if (td === null) return <></>;
          return (
            <TodoElement
              todo={td}
              creation={props.api.saveTodo}
              key={index}
              todoIndex={index}
            ></TodoElement>
          );
        })}
      {props.todos.length === 0 && <NoTodoCard />}
    </div>
  );
};

export default TodosContainer;
