import { TodoTypes } from "../shared/todos";
import React from "react";

type TodoElementProps = {
    todo: TodoTypes.ITodos
}

const TodoElement: React.FC<TodoElementProps> = ({ todo }) => {
    return (
        <div>
            { todo.content() }
        </div>
    )
}

export default TodoElement;