import React, { useState } from "react";
import Form from "./Form";
import TodoList from "./TodoList";
import TodoListHeader from "./TodoListHeader";
import moment from "moment";

const TodoApp = () => {
  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem("todos")) || [
      {
        id: 1,
        title: "Build some websites",
        done: false,
        dueDate: "2021-12-31",
      },
      { id: 2, title: "Do exercises", done: false, dueDate: "2021-12-25" },
      { id: 3, title: "Go shopping", done: false, dueDate: "2021-12-24" },
      { id: 4, title: "House cleaning", done: true, dueDate: "2021-12-23" },
    ]
  );

  const [filter, setFilter] = useState(false);

  const addTodo = (title, date) => {
    const newTodo = {
      id: todos.length + 1,
      title,
      done: false,
      dueDate: moment(date).format("YYYY-MM-DD"),
    };
    const newTodos = [...todos, newTodo];
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  const toggleDone = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.checked);
  };

  return (
    <>
      <TodoListHeader tasksLeft={todos.filter((todo) => !todo.done).length} />
      <div className="filter-container">
        <input
          type="checkbox"
          id="not-finished-only"
          onChange={handleFilterChange}
        />
        <label htmlFor="not-finished-only">Not finished only</label>
      </div>
      <TodoList
        todos={filter ? todos.filter((todo) => !todo.done) : todos}
        toggleDone={toggleDone}
      />
      <Form addTodo={addTodo} />
    </>
  );
};

export default TodoApp;
