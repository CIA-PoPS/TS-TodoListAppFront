import { useState } from "react";
import { TodoTypes } from "../../shared/todos";
import "./TodoElement.css";
import { TodosApiFunctions } from "../../interfaces/todo.types";
import "./TodoElement.css";

type TodoDisplayProps = {
  todo: TodoTypes.ITodos;
  todo_index: number;
  updateTodo: TodosApiFunctions.updateTodo;
};

export const TodoDisplay: React.FC<TodoDisplayProps> = ({
  todo,
  todo_index,
  updateTodo,
}) => {
  const [showActionBar, doShowActionBar] = useState(false);
  const dto = todo.getDTO();

  return (
    <div className="TodoElement">
      <div
        className={`TodoDisplay ${dto.completed ? "TodoCompleted" : ""}`}
        onClick={() => doShowActionBar(!showActionBar)}
      >
        <div className="TodoTypeElement">
          {TodoTypes.TodoPrefix.extractFrom(todo.content()).getPrefix()}
        </div>
        <div className="TodoContent">
          {TodoTypes.TodoPrefix.removeFrom(todo.content())}
        </div>
      </div>
      {showActionBar ? (
        <div className="TodoRow TodoDisplayActionBar">
          <div
            className="TodoActionButton TodoCompletedAction"
            onClick={() =>
              updateTodo({ ...dto, completed: !dto.completed }, todo_index)
            }
          >
            {dto.completed ? "Undone" : "Done"}
          </div>
          <div
            className="TodoActionButton TodoDeleteAction"
            onClick={() => updateTodo(null, todo_index)}
          >
            Delete
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
