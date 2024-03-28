import React, { useCallback, useMemo, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import TodosContainer from "./components/TodosContainer";
import { SimpleTodo, TodoTypes } from "./shared/todos";
import { TDElementTypes } from "./components/TodoElement";
import { ITodosAPI } from "./shared/utility";

function App() {
  const [todos, setTodos] = useState<TDElementTypes.Type[]>([]);

  const isAdding = () => todos.length > 0 && todos[0] === null;

  const saveTodo = useCallback(
    (newTodo: TodoTypes.TodoDTO | null) =>
      setTodos((old) => {
        if (old.length === 0 || old[0] !== null) return old;
        if (newTodo !== null) old.push(SimpleTodo.fromDTO(newTodo));
        return old.slice(1);
      }),
    []
  );

  const createTodo = useCallback(() => setTodos((old) => [null, ...old]), []);

  const updateTodo = useCallback(
    (todoData: TodoTypes.TodoDTO | null, index: number) =>
      setTodos((old) => {
        if (index < 0 || index >= old.length) return old;
        if (todoData === null) old.splice(index);
        else old[index] = SimpleTodo.fromDTO(todoData);
        return old;
      }),
    []
  );

  const TDElementAPI = useMemo<ITodosAPI>(
    () => ({
      saveTodo: saveTodo,
      updateTodo: updateTodo,
    }),
    [saveTodo, updateTodo]
  );

  return (
    <div className="App">
      <div className="mycontainer">
        <Header addTodoTrigger={createTodo} enabled={!isAdding()} />
        <TodosContainer todos={todos} api={TDElementAPI}></TodosContainer>
      </div>
    </div>
  );
}

export default App;
