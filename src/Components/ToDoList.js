import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { EditForm } from "./EditForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";

function ToDoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  const handleInputChange = (event) => {
    setNewTask(event.target.value);
  };

  const addTask = (event) => {
    event.preventDefault();
    if (newTask.trim() !== "") {
      setTasks([
        ...tasks,
        { id: uuidv4(), task: newTask, completed: false, isEditing: false },
      ]);
      setNewTask("");
    }
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const editTodo = (id) => {
    setTasks(
      tasks.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  };

  const editTask = (task, id) => {
    setTasks(
      tasks.map((todo) =>
        todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo
      )
    );
  };

  const toggleComplete = (id) => {
    setTasks(
      tasks.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  return (
    <div className="to-do-list">
      <h1>To Do List</h1>
      <div>
        <form className="toDoForm" onSubmit={addTask}>
          <input
            className="formInput"
            type="text"
            placeholder="Enter the task..."
            value={newTask}
            onChange={handleInputChange}
          />
          <button className="sub-btn" type="submit">
            Add Task
          </button>
        </form>
      </div>
      <div className="displayToDo">
        {tasks.map((item) =>
          item.isEditing ? (
            <EditForm key={item.id} editTodo={editTask} task={item} />
          ) : (
            <div className="display" key={item.id}>
              <p
                className={`${item.completed ? "completed" : "incompleted"}`}
                onClick={() => toggleComplete(item.id)}
              >
                {item.task}
              </p>
              <div className="icon">
                <FontAwesomeIcon
                  className="edit-icon"
                  icon={faPenToSquare}
                  onClick={() => editTodo(item.id)}
                />
                <FontAwesomeIcon
                  className="delete-icon"
                  icon={faTrash}
                  onClick={() => deleteTask(item.id)}
                />
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default ToDoList;
