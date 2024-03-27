import React, { useCallback, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import TodosContainer from "./components/TodosContainer";
import { SimpleTodo, TodoTypes } from "./shared/todos";
import { TDElementTypes } from "./components/TodoElement";

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

  // const getApi = useMemo<ITodosAPI>(
  //   () => ({
  //     saveTodo: saveTodo,
  //     createTodo: createTodo,
  //   }),
  //   [saveTodo, createTodo]
  // );

  return (
    <div className="App">
      <div className="mycontainer">
        <Header addTodoTrigger={createTodo} enabled={!isAdding()} />
        <TodosContainer
          todos={todos}
          createTodoCallback={saveTodo}
        ></TodosContainer>
      </div>
    </div>
  );
}

export default App;
