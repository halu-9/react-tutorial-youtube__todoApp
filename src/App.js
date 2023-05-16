import "./App.css";
import { TodoList } from "./TodoList";
import { useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [todos, setTodos] = useState([]);

  const todoNameRef = useRef();

  const handleAddTodo = () => {
    // タスクを追加
    const name = todoNameRef.current.value;
    if(name === "") return
    setTodos((prevTodos) => {
      /*
      以下は前のタスクに現在のタスクを追加するという意味
      現在のタスクが4つなら、prevTodosには4つのタスクがあって、その4つに
      {id:"1", name:name, completed: false}
      を加えた5つのオブジェクトを新しくtodosにする（usestateでセットする）って感じ。
      */
      return [...prevTodos, { id: uuidv4(), name: name, completed: false }];
      todoNameRef.current.value = null;
    });
  };

  const toggleTodo = (id) => {
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === id);
    todo.completed = !todo.completed;
    setTodos(newTodos);
  };

  const handleClear = () => {
    const newTodos = todos.filter((todo) => !todo.completed);
    setTodos(newTodos);
  };

  return (
    <>
      <TodoList todos={todos} toggleTodo={toggleTodo} />
      <input type="text" ref={todoNameRef} />
      <button onClick={handleAddTodo}>タスクを追加</button>
      <button onClick={handleClear}>完了したタスクの削除</button>
      <div>残りのタスク：{todos.filter((todo) => !todo.completed).length}</div>
    </>
  );
}

export default App;
