import React, { useEffect, useState } from "react";
import "./App.css";

const App = () => {
  /**
   * @type {[{id: number, text: string, completed: bool}, () => void]}
   */
  const [todos, setTodos] = useState([]);
  const [todoEditing, setTodoEditing] = useState(undefined);

  // local storage
  
  useEffect(() => {
    const todosJson = localStorage.getItem('todos');
    const parsedTodos = JSON.parse(todosJson);

    if (parsedTodos) {
      setTodos(parsedTodos);
    }
  }, []);


  useEffect(() => {
    if (todos.length) {
      const json = JSON.stringify(todos);
      localStorage.setItem('todos', json);
    }
  }, [todos]);

  // Add the handlesubmit code here
  const handleSubmit = (e) => {
    e.preventDefault();

    const { value } = e.target.firstChild;

    if (value.length) {
      setTodos(todos.concat({
        id: performance.now(),
        text: value,
        completed: false
      }))
    }
    else {
      alert("Enter a valid todo");
    }

    e.target.firstChild.value = "";
  }

  // Add the deleteToDo code here
  const deleteToDo = (id) => {
    setTodos(todos.filter(({ id: id2 }) => id !== id2))

    if (todoEditing === id) setTodoEditing(null);
  }


  // Add the toggleComplete code here
  const toggleComplete = (id) => {
    setTodos(todos.map(({ id: id2, text, completed, editing }) => id === id2 ? { id, text, completed: !completed, editing } : { id: id2, text, completed, editing }))
  }


  // Add the submitEdits code here
  const submitEdit = (e) => {
    e.preventDefault();

    const edit = document.getElementById(todoEditing).value;

    setTodos(todos.map((todo) =>
      todo.id === todoEditing ? { ...todo, text: edit } : todo
    ));

    setTodoEditing(null);
  }

  return (
    <div className="App">
      <h1>Todo List</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" id='todoAdd' />
        <button type="submit">Add Todo</button>
      </form>
      {todos.map(({ id, text, completed }) => (
        <div className="todo" key={id}>
          <div className="todoText">
            <input type="checkbox" id="completed" checked={completed} onChange={() => toggleComplete(id)} />
            {todoEditing === id
              ? <input type="text" id={id} defaultValue={text} />
              : text
            }
          </div>
          <br></br>
          <div className="todo-actions">
            {todoEditing === id ?
              <button onClick={submitEdit}>提出</button> :
              <button onClick={() => setTodoEditing(id)}>編集</button>
            }
            <button onClick={() => deleteToDo(id)}>🗑️</button>
          </div>
        </div>
      )
      )}
    </div>
  );
};
export default App;
