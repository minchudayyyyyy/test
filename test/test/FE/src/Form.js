import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Form = ({ addTodo }) => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(new Date());

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      addTodo(title, date);
      setTitle("");
      setDate(new Date());
    }
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <div className="three">
        <div className="one">
          <input
            type="text"
            className="todo-input"
            placeholder="Enter a new task"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <DatePicker selected={date} onChange={(date) => setDate(date)} />
        </div>
        <button type="submit" className="todo-submit two">
          Add
        </button>
      </div>
    </form>
  );
};

export default Form;
