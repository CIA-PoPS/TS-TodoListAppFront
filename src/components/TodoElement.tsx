import { TodoTypes } from "../shared/todos";
import React, { useEffect, useRef, useState } from "react";

import "./TodoElement.css";
import { onChangeTextAreaEvent } from "../shared/utility";

export namespace TDElementTypes {
  export type creationCallback = (data: TodoTypes.TodoDTO | null) => void;
  export type Type = TodoTypes.ITodos | null;

  export type TodoElementProps = {
    todo: Type;
    creation: creationCallback;
  };
}

namespace Components {
  export const TodoDisplay = (todo: TodoTypes.ITodos) => {
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

  type TextAreaProperties = {
    content: string;
    bgclass: string;
    rows: number;
    height: string;
  };

  export const TodoCreation = (callback: TDElementTypes.creationCallback) => {
    const [prefix, setPrefix] = useState("-");

    const [bgClass, setBgClass] = useState("bg-sky-500");

    const txtAreaRef = useRef<HTMLTextAreaElement>(null);
    const [txtAreaProps, setTxtAreaProps] = useState<TextAreaProperties>({
      content: "",
      bgclass: "",
      rows: 1,
      height: "auto",
    });

    useEffect(() => {
      const timer = setTimeout(() => {
        setBgClass("bg-teal-100 border-sky-500");
      }, 100);
      return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
      const timer = setTimeout(() => {
        setTxtAreaProps({
          ...txtAreaProps,
          bgclass: "",
        });
        txtAreaRef.current?.focus();
      }, 200);

      return () => clearTimeout(timer);
    }, [txtAreaProps, txtAreaProps.bgclass]);

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

      setTxtAreaProps({
        ...txtAreaProps,
        height: `${element.scrollHeight + paddingBottom + paddingTop}px`,
        content: element.value,
        rows: rows === 0 ? 1 : rows,
      });
    };

    const createNewTodo = () => {
      if (!txtAreaProps.content.trim().length) {
        setTxtAreaProps({
          ...txtAreaProps,
          bgclass: "bg-red-500",
        });
        return;
      }

      callback({
        createAt: Date.now(),
        by: "test",
        content: txtAreaProps.content,
        prefix: prefix,
        completed: false,
      });
    };

    return (
      <div className={`TodoElement ${bgClass} border-2`}>
        <div className="TodoRow TodoActionBar">
          <div
            className="TodoButtonBar TodoCancelButton"
            onClick={() => callback(null)}
          >
            Cancel
          </div>
          <div
            className="TodoButtonBar TodoCreateButton"
            onClick={createNewTodo}
          >
            Create
          </div>
        </div>
        <div className="TodoRow w-full">
          <div className="TodoTypeElement">
            {TodoTypes.TodoPrefix.get(prefix).getPrefix()}
          </div>
          <textarea
            className={`${
              txtAreaProps.bgclass.length ? txtAreaProps.bgclass : bgClass
            } TodoTxtArea`}
            onChange={onContentInput}
            style={{ height: txtAreaProps.height }}
            rows={txtAreaProps.rows}
            autoFocus
            value={txtAreaProps.content}
            maxLength={512}
            ref={txtAreaRef}
          />
        </div>
      </div>
    );
  };
}

export const TodoElement: React.FC<TDElementTypes.TodoElementProps> = ({
  todo,
  creation,
}) => {
  return todo !== null
    ? Components.TodoDisplay(todo)
    : Components.TodoCreation(creation);
};
