import { TodoTypes } from "../shared/todos";
import React from "react";

export namespace TDElementTypes {
    export type TodoElementDisplayParam = {
        todo: TodoTypes.ITodos
    }

    export type creationCallback = () => {}

    export type TodoElementCreationParam = {
        callback: (data: TodoTypes.TodoDTO) => void;
    }

    export type ParamsType = TodoElementDisplayParam | TodoElementCreationParam;

    export type TodoElementProps = {
        params: ParamsType
    }
};

namespace Components {
    export const TodoDisplay = (todo: TodoTypes.ITodos) => {
        return (
            <div>
                {
                    todo.content()
                }
            </div>
        )
    }

    export const TodoCreation = () => {
        return <></>
    }
}

const _doDisplay = (params: TDElementTypes.ParamsType): params is TDElementTypes.TodoElementDisplayParam => (params as TDElementTypes.TodoElementDisplayParam).todo !== undefined;

export const TodoElement: React.FC<TDElementTypes.TodoElementProps> = ({ params }) => {
    return (
        _doDisplay(params) ? 
            Components.TodoDisplay(params.todo)
            :
            Components.TodoCreation()
    );
}
