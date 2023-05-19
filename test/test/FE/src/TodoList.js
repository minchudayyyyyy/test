import React from "react";
import { FaRegCircle, FaRegCheckCircle } from "react-icons/fa";
import moment from "moment";

const TodoList = ({ todos, toggleDone }) => {
  return (
    <div className="todo-list-container">
      {todos.map((todo) => (
        <div
          className={`todo-item-container ${todo.done ? "done" : ""}`}
          key={todo.id}
        >
          {todo.done ? (
            <FaRegCheckCircle
              className="item-done-button"
              color="#9a9a9a"
              onClick={() => toggleDone(todo.id)}
            />
          ) : (
            <FaRegCircle
              className="item-done-button"
              color="#9a9a9a"
              onClick={() => toggleDone(todo.id)}
            />
          )}
          <div className="item-title">{todo.title}</div>
          <div className="item-due-date">
            Due {moment(todo.dueDate).fromNow()}
          </div>{" "}
        </div>
      ))}
    </div>
  );
};

export default TodoList;
