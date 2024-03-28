import { useState } from "react";
import { TodoTypes } from "../../shared/todos";
import "./TodoElement.css";

type TodoDisplayProps = {
  todo: TodoTypes.ITodos;
  todo_index: number;
};

export const TodoDisplay: React.FC<TodoDisplayProps> = ({
  todo,
  todo_index,
}) => {
  const [showActionBar, doShowActionBar] = useState(false);

  return (
    <div className="TodoElement">
      <div
        className="TodoDisplay"
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
          <div className="TodoActionButton TodoCompletedAction">Done</div>
          <div className="TodoActionButton TodoDeleteAction">Delete</div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
