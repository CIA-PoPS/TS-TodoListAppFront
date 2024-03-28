import { useEffect, useRef, useState } from "react";
import { onChangeTextAreaEvent } from "../../shared/utility";
import { TodoTypes } from "../../shared/todos";
import "./TodoElement.css";
import { TodosApiFunctions } from "../../interfaces/todo.types";

type TextAreaProperties = {
  content: string;
  bgclass: string;
  rows: number;
  height: string;
};

type TodoCreationProps = {
  on_create: TodosApiFunctions.saveTodo;
};

export const TodoCreation: React.FC<TodoCreationProps> = ({ on_create }) => {
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

    on_create({
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
          onClick={() => on_create(null)}
        >
          Cancel
        </div>
        <div className="TodoButtonBar TodoCreateButton" onClick={createNewTodo}>
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
