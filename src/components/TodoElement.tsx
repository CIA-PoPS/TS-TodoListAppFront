import { TodoTypes } from "../shared/todos";
import React, { useEffect, useState } from "react";

import "./TodoElement.css";
import { onChangeTextAreaEvent } from "../shared/utility";

export namespace TDElementTypes {
  export type TodoElementDisplayParam = {
    todo: TodoTypes.ITodos;
  };

  export type TodoElementCreationParam = {
    callback: (data: TodoTypes.TodoDTO | null) => void;
  };

  export type ParamsType = TodoElementDisplayParam | TodoElementCreationParam;

  export type TodoElementProps = {
    params: ParamsType;
  };
}

namespace Components {
  export const TodoDisplay = (todo: TodoTypes.ITodos) => {
    return <div className="TodoElement">{todo.content()}</div>;
  };

  export const TodoCreation: React.FC<
    TDElementTypes.TodoElementCreationParam
  > = (props) => {
    const [content, setContent] = useState("");
    const [prefix, setPrefix] = useState("-");

    const [bgClass, setBgClass] = useState("bg-sky-500");

    const [txtAreHeight, setHeight] = useState("auto");
    const [nbrRows, setRows] = useState(1);

    useEffect(() => {
      const timer = setTimeout(() => {
        setBgClass("bg-teal-100 border-sky-500");
      }, 100);
      return () => clearTimeout(timer);
    }, []);

    const onContentInput = (event: onChangeTextAreaEvent) => {
      const element = event.target;

      const paddingTop = parseInt(element.style.paddingTop, 10);
      const paddingBottom = parseInt(element.style.paddingBottom, 10);

      element.style.height = "auto";
      const rows = (element.value.match(/\n/g) || []).length;
      if (rows > 12) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }

      setHeight(`${element.scrollHeight + paddingBottom + paddingTop}px`);
      setContent(element.value);
      setRows(rows === 0 ? 1 : rows);
    };

    return (
      <div className={`TodoElement ${bgClass} border-2`}>
        <div className="TodoRow TodoActionBar">
          <div
            className="TodoButtonBar TodoCancelButton"
            onClick={() => props.callback(null)}
          >
            Cancel
          </div>
          <div
            className="TodoButtonBar TodoCreateButton"
            onClick={() => {
              props.callback({
                createAt: Date.now(),
                by: "test",
                content: content,
                prefix: prefix,
              });
            }}
          >
            Create
          </div>
        </div>
        <div className="TodoRow">
          <div className="TodoTypeElement">
            {TodoTypes.TodoPrefix.get(prefix).getPrefix()}
          </div>
          <textarea
            className={`${bgClass} TodoTxtArea`}
            onChange={onContentInput}
            style={{ height: txtAreHeight }}
            rows={nbrRows}
            autoFocus
            value={content}
            maxLength={512}
          />
        </div>
      </div>
    );
  };
}

const _doDisplay = (
  params: TDElementTypes.ParamsType
): params is TDElementTypes.TodoElementDisplayParam =>
  (params as TDElementTypes.TodoElementDisplayParam).todo !== undefined;

export const TodoElement: React.FC<TDElementTypes.TodoElementProps> = ({
  params,
}) => {
  return _doDisplay(params)
    ? Components.TodoDisplay(params.todo)
    : Components.TodoCreation(params);
};
